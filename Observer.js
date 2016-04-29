/*
观察者模式又叫发布订阅模式（Publish/Subscribe），它定义了一种一对多的关系，让多个观察者对象同时监听某一个主题对象，这个主题对象的状态发生变化时就会通知所有的观察者对象，使得它们能够自动更新自己。

使用观察者模式的好处：

1. 支持简单的广播通信，自动通知所有已经订阅过的对象。
2. 页面载入后目标对象很容易与观察者存在一种动态关联，增加了灵活性。
3. 目标对象与观察者之间的抽象耦合关系能够单独扩展以及重用。
*/

function Observer() {
  this.subscribers = [];
}

Observer.prototype = {
  subscribe: function (subscriber) {
    this.subscribers.push(subscriber);
  },

  unsubscribe: function (subscriber) {
    this.subscribers = this.subscribers.filter(function (d) {
      return d !== subscriber;
    });
  },

  publish: function (params, context) {
    if (!context) {
      context = window;
    }

    this.subscribers.forEach(function (subscriber) {
      subscriber.call(context, params);
    })
  }
};

var ob = new Observer();

var f1 = function (data) {
  console.log('Hello, ' + data);
};

var f2 = function (data) {
  console.log('Goodbye, ' + data);
};

ob.subscribe(f1);
ob.subscribe(f2);

ob.publish('Bob');

ob.unsubscribe(f1);

ob.publish('Tom');
