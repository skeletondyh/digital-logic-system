var slice = Array.prototype.slice;

// args: (fn, arg0 .. argn)
// - promisify.fn(arg0 .. argn, cb)
// - cb 的参数完全转移，转嫁错误处理
// - 注意：cb只能被有效调用一次，一次调用后失效
// - 如果 cb 参数不多于一个，则不 zip 传递
exports.promisify = function(fn) {
    var ctx = this;
    var args = slice.call(arguments, 1);
    return new Promise(function(resolve, reject) {
        args.push(function() {
            if (Array.prototype.slice.call(arguments).length <= 1) {
                resolve(arguments[0]);
            } else {
                resolve(arguments);
            }
        });

        if (typeof(fn) === 'function') {
            fn.apply(ctx, args);
        } else {
            ctx[fn].apply(ctx, args);
        }
    });
};

// 展开 promisify 修饰中集合的回调参数表
exports.spread = function(cb) {
    var ctx = this;
    return function(args) {
        return cb.apply(ctx, args);
    };
};

// 封装成promise，直接传递参数给 tp.spread 的结果使用
exports.pickle = function() {
    var args = arguments;
    return new Promise(function(resolve, reject) {
        resolve(args);
    });
}

/*  !Promise.all() 已经解决此功能!
    title: 为了进行用户单线程、单束任务转多束任务转单束任务，规定bundle多束包装协议
    >>>
    类型> bundle : promise[]
    promise产生> bundle.bundle() : promise
// *
var bundle = function() {
    var tasks = Array.prototype.slice.call(this);
    return new Promise(function(resolve, reject) {
        var taskRemain = tasks.length;
        var results = [];
        for (var i = 0; i < tasks.length; ++i) {
            tasks[i].then(function() {
                result[i] = arguments;
                -- taskRemain;
                if (taskRemain === 0) {
                    resolve(results);
                }
            })
            .catch(function(err) {
                reject(err);
            })
        }
    });
}
//exports.bundle = bundle.bundle = bundle; */