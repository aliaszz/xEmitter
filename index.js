/*
 *  全局事件发射器 -- xEmitter
 *
 *  on: on(key, fn, [last]),订阅事件,key表示事件名称,fn表示事件回调, last为可选参数,如果传入 "last",表示如果某事件发布已经多次发布,再订阅时只触发最后一次发布.默认为全部触发.
 *  off: off(key, [fn]).取消订阅事件, key表示事件名称,fn表示事件回调,如果 fn不传入,则表示清除该事件类型下得所有订阅
 *  one: off(key, fn, [last]).订阅事件,清除重复订阅事件,只保留这一次订阅, key表示事件名称,fn表示事件回调,last为可选参数,如果传入 "last",表示如果某事件发布已经多次发布,再订阅时只触发最后一次发布.默认为全部触发.
 *  emit: emit(key, [argument[,argument...]]) 发布事件,key表示事件名称,argument表示要发布的信息.
 *
 **/

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.xEmitter = factory(root.b);
    }
}(this, function() {
    var xEmitter = {
        version: "0.1.0",
        name: "xEmitter"
    };
    var _listeners;

    xEmitter.on = function(type, listener) {
        if (!_listeners) _listeners = {};
        if (!_listeners[type]) _listeners[type] = []
        _listeners[type].push(listener);

        return listener;
    };

    xEmitter.one = function(type, listener) {
        xEmitter.on(type, proxyListener);

        function proxyListener() {
            xEmitter.off(type, proxyListener);
            listener.apply(null, arguments);
        }
    };

    xEmitter.off = function(type, listener) {
        if (!_listeners || !_listeners[type]) return;

        var arr = _listeners[type];
        for (var i = 0, l = arr.length; i < l; i++) {
            if (arr[i].toString() == listener.toString()) {
                if (l == 1) {
                    delete(_listeners[type]);
                }
                // allows for faster checks.
                else {
                    arr.splice(i, 1);
                }
                break;
            }
        }
    };

    xEmitter.offAll = function(type) {
        if (!type)
            _listeners = null;
        else if (_listeners)
            delete(_listeners[type]);
    };

    xEmitter.emit = function(eventName, eventTarget) {
        var ret = false,
            listeners = _listeners;

        if (eventName && listeners) {
            var arr = listeners[eventName];
            if (!arr) return ret;

            arr = arr.slice();
            // to avoid issues with items being removed or added during the dispatch

            var handler, i = arr.length;

            var args = Array.prototype.slice.call(arguments);
            args.shift();
            
            while (i--) {
                var handler = arr[i];
                ret = ret || handler.apply(null, args);
            }

        }

        return !!ret;
    };

    xEmitter.has = function(type) {
        var listeners = _listeners;
        return !!(listeners && listeners[type]);
    };

    return xEmitter;
}));
