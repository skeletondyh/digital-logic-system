var should = require('should');

describe('tiny-promise.js', function() {
    var tp = require('../tiny-promise');
    var test0 = function(cb) {
        cb();
    };
    var fun0 = function() {
        return 1;
    };
    var test1 = function(a, cb) {
        cb(a);
    };
    var fun1 = function(a) {
        return a;
    };
    var testn = function(a, b, c, d, cb) {
        cb(a, b, c, d);
    };
    var obj1 = {
        val: 9,
        fun: function(cb) {
            cb(this.val);
        }
    };

    describe('promisify() 末尾单回调函数转换为Promise', function() {
        it('回调函数无参数', function() {
            return tp.promisify(test0)
            .then(fun0)
            .should.be.finally.equal(1);
        });
        it('回调函数一个参数', function() {
            return tp.promisify(test1, 2)
            .then(fun1)
            .should.be.finally.equal(2);
        });
        it('普通用法不能使用成员函数', function() {
            return tp.promisify(obj1.fun)
            .should.be.finally.an.Undefined();
        });
        it('.call方式使用成员函数', function() {
            return tp.promisify.call(obj1, obj1.fun)
            .should.be.finally.equal(9);
        });
        it('.call方式调用可以传递字符串成员函数名，节省前缀'
        , function() {
            return tp.promisify.call(obj1, 'fun')
            .should.be.finally.equal(9);
        });
    });
    describe('spread() 装饰器，展开回调函数参数', function() {
        it('回调函数参数多于1', function() {
            return tp.promisify(testn, 3, 4, 5, 6)
            .then(tp.spread(function(res1, res2, res3, res4, res5) {
                res1.should.be.equal(3);
                res2.should.be.equal(4);
                res3.should.be.equal(5);
                res4.should.be.equal(6);
                should(res5).be.equal(undefined);
            }));
        });
    });
    describe('pickle() 打包参数以Promise方式传递给回调函数', function() {
        it('多参数传递测试', function() {
            return tp.pickle(1, 2, 3, 4)
            .then(tp.spread(function(res1, res2, res3, res4, res5) {
                res1.should.be.equal(1);
                res2.should.be.equal(2);
                res3.should.be.equal(3);
                res4.should.be.equal(4);
                should(res5).be.equal(undefined);
            }));
        });
    });
});