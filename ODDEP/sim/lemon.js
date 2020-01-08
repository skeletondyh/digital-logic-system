/*
    lemon.submit(token, step[, opt]) :
        提交令牌，提交的准备，题目类型参数{pid,check}
*/
var proc = require('child_process');
var fs = require('fs');
var updSP = require('../db/dbtop').updStatPromise;
var tp = require('../tiny-promise');
var debug = require('debug');
var log = debug('prj7_tot:lemon:log');
var error = debug('prj7_tot:lemon:error');

var sim = function(args, next) {
    var judge = null;
    updSP(args.token, 'running').then(function(err) {
        var simArgs = [args.codePath, args.stimPath, args.resPath];
        if (args.check) {
            simArgs.push(args.inputPath);
            simArgs.push(args.answerPath);
        }
        log('simArgs:', simArgs);
        return tp.promisify(proc.execFile, './sim/sim.sh', simArgs, {cwd:'.'})
    })
    .then(tp.spread(function(err, stdout, stderr) {
        if (err) {
            throw {
                err : err,
                stdout : stdout,
                stderr : stderr
            };
        }
        log('stderr:', args.token, stderr);
        if (stderr) {
            if (stderr.indexOf('AC') !== -1) judge = 'AC';
            if (stderr.indexOf('WA') !== -1) judge = 'WA';
        }
        return tp.promisify(fs.writeFile, args.logPath, stdout);
    }))
    .then(function(err) {
        if (err) {
            error(err);
            return updSP(args.token, 'failed');
        } else {
            if (judge) {
                return updSP(args.token, judge);
            } else {
                return updSP(args.token, 'done');
            }
        }
    },function(err) {
        if (typeof(err.stdout) !== 'undefined') {
            return tp.promisify(fs.writeFile, args.logPath, err.stdout + '\n' + err.stderr)
                .then(function(err) {
                    if (err) error(err);
                    else log('written');
                    return updSP(args.token, 'failed');
                });
        } else {
            error(err);
            return 0;
        }
    }).then(next);
};

var lemon = (function() {
    var status = 0;
    var queue = [];
    var map = {};
    var slots = {};
    function emit() {
        for (var key in slots) {
            if (typeof(slots[key]) === 'function') {
                slots[key]();
            } else {
                delete slots[key];
            }
        }
    }
    var touch = function() {
        log('queue:', queue);
        log('map:', map);
        if (status === 0 && queue.length > 0 && map[queue[0]].step === 2) {
            status = 1;
            var token = queue.shift();
            var opt = map[token].opt;
            var stimPath = './public/tmp/motivate/' + token + '.vhd';
            if (opt.check) stimPath = './sim/motivate/' + opt.pid + '.vhd';
            delete map[token];
            log('Submit Running:', token);
            sim({
                token : token,
                check : opt.check,
                codePath : './public/tmp/code/' + token + '.vhd',
                resPath : './public/tmp/vcd/' + token + '.vcd',
                logPath : './public/tmp/log/' + token + '.log',
                inputPath : './sim/input/' + opt.pid + '.in',
                answerPath : './sim/answer/' + opt.pid + '.ans',
                stimPath : stimPath
            }, function() {
                log('Submit Done:', token);
                status = 0;
                touch();
                emit();
            });
        }
    }
    var obj = {
        submit : function(token, step, opt) {
            if (typeof(map[token]) === 'undefined') {
                map[token] = { step : step };
                queue.push(token);
            } else {
                map[token].step += step;
            }
            if (opt) map[token].opt = opt;
            touch();
        },
        setSLOT : function(key, fn) {
            slots[key] = fn;
        }
    }
    return obj;
}());

module.exports = lemon;