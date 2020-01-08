/*
    tiny-promise 测试代码
    (bundle 未测试)
*/
var tp = require('../../tiny-promise');
var assert = require('assert');
var debug = require('debug');
var log = debug('prj7_tot:testPreStart:log');

/*var ctx = {
    run: function(cb) {
        cb();
        cb();
        cb();
    }
};

tp.promisify.call(ctx, 'run')
.then(function() {
    log('step1');
})
.then(function() {
    log('step2');
})
.catch(function(err) {
    log(err);
});//*/

var teste = {
    a:1,
    fun:function() {
        //log(x);
        return typeof(this.a);
    }
}

// 测试上下文传递
assert.strictEqual(teste.fun(), 'number');
assert.strictEqual(tp.spread(teste.fun)(), 'undefined');
assert.strictEqual(tp.spread(teste.fun).call(teste), 'undefined');
assert.strictEqual(tp.spread.call(teste, teste.fun)(), 'number');

// 测试映射式函数调用，单值传递
teste.fun = function(cb) {
    cb(typeof(this.a));
};
tp.promisify.call(teste, 'fun')
.then(function(x) {
    assert.strictEqual(x, 'number');
    return x;
})
.then(function(x) {
    assert.strictEqual(x, 'number');
});

// 测试普通函数调用，回调参数集装、展开
var fun1 = function(a, b, c, d, cb) {
    cb(a, b, c, d);
}
var cb1 = function(a, b, c, d) {
    assert.strictEqual(a, 1);
    assert.strictEqual(b, 2);
    assert.strictEqual(c, 3);
    assert.strictEqual(d, 4);
}
tp.promisify(fun1, 1, 2, 3, 4)
.then(tp.spread(cb1));

// 测试cb返回promise
tp.promisify(fun1, 1, 2, 3, 4)
.then(function() {
    return tp.promisify.call(teste, teste.fun);
})
.then(function(x) {
    assert.strictEqual(x, 'number');
});

// 测试cb有1个参数
var fun2 = function(a, cb) {
    cb(a);
}
tp.promisify(fun2, 99)
.then(function(a) {
    assert.strictEqual(a, 99);
});


log('tiny-promise test done.');