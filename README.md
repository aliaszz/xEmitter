# 事件派发器xEmitter

-----

> xEmitter一个全局事件派发器，你可以在任何时间、任何地点调用他。最重要的是他只有几十行代码而已!

## 安装
```
npm i 'xemitterjs' --save
```

## 使用
```
import xEmitter from 'xemitterjs';

// emit event
xEmitter.emit("CANCEL-ALERT", this.props.data);

// on
xEmitter.on("CANCEL-ALERT", this.closeHandler.bind(this));
```

## 文档api

### emit
`emit(key, [argument[,argument...]])` 发布事件

* key表示事件名称,
* argument表示要发布的信息.


### on
`on(key, fn, [last])` 订阅事件

* key表示事件名称,
* fn表示事件回调, 
* last为可选参数,如果传入 "last",表示如果某事件发布已经多次发布,再订阅时只触发最后一次发布.默认为全部触发.

### off
`off(key, [fn])`.取消订阅事件, 

* key表示事件名称
* fn表示事件回调,如果 fn不传入,则表示清除该事件类型下得所有订阅

### offAll
`offAll(key)`.取消某事件所有订阅方法, 

* key表示事件名称


### one
`one(key, fn, [last])` .订阅事件,清除重复订阅事件,只保留这一次订阅

* key表示事件名称
* fn表示事件回调
* last为可选参数,如果传入 "last",表示如果某事件发布已经多次发布,再订阅时只触发最后一次发布.默认为全部触发.