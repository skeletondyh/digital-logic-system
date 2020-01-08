var fs = require('fs');
var tp = require('../tiny-promise');
var dbtop = require('./dbtop');
var md5 = require('js-md5');

var getSalt = function() {
    return Math.random().toString(36).substr(2) + ':' + new Date().getTime();
};

var rock = 'yvykf07ej800be29TAOLIDIXIACHEDUI8nzoyyz0z5lsdcxr';

exports.doDefault = function(cb) {
    tp.promisify.call(fs, fs.readFile, './db/userImport.txt', 'utf-8')
    .then(tp.spread(function(err, data) {
        if (err) cb(err);
        var db = dbtop.db();
        var stmt = db.prepare('insert into user (name, nickname, password, salt) values (?, ?, ?, ?)');
        var alist = data.split(/\r\n|\r|\n/);
        for (var i = 0; i < alist.length; ++i) {
            var a = alist[i].split(' ');
            if (a.length === 2) {
                var name = a[0];
                var salt = getSalt();
                var pass = md5(md5(a[1] + a[0] + rock) + salt);
                stmt.run(name, name, pass, salt);
            }
        }
        stmt.finalize(cb);
    }))
    .catch(function(err) {
        cb(err);
    });
}