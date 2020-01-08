var express = require('express');
var router = express.Router();
var dbtop = require('../db/dbtop');
var tp = require('../tiny-promise');
var userimp = require('../db/userimport');
var debug = require('debug');
var log = debug('prj7_tot:admin:log');
var error = debug('prj7_tot:admin:error');

// 权限大于1，为管理员。权限为1是题目维护者。
router.all('*', function(req, res, next) {
    if (req.session.power && req.session.power > 1) {
        next();
    } else {
        next({
            status: 403,
            message: 'Permission denied'
        });
    }
});

router.get('/', function(req, res, next) {
    res.render('admin', { title: '后台管理'});
});

router.get('/search/user', function(req, res, next) {
    var db = dbtop.db();
    var all = req.query.all;
    var uid = req.query.uid;
    var name = req.query.name;
    var stmt = null;
    if (all) stmt = db.prepare('select * from user where power > 0');
    if (uid) stmt = db.prepare('select * from user where uid = ?', parseInt(uid));
    if (name) stmt = db.prepare('select * from user where name = ?', name);
    if (stmt === null) {
        res.sendStatus(403);
    } else {
        tp.promisify.call(stmt, 'all')
        .then(tp.spread(function(err, rows) {
            if (err) {
                res.sendStatus(500);
                throw err;
            }
            res.send(rows);
        }))
        .catch(function(err) {
            error(err);
        });
        stmt.finalize();
    }
});

router.post('/power', function(req, res, next) {
    var uid = parseInt(req.body.uid) || -1;
    var oper = parseInt(req.body.oper);
    if (uid <= 1 || (oper < 0 || oper > 2 || oper === NaN)) {
        res.sendStatus(403);
    } else {
        var db = dbtop.db();
        tp.promisify.call(db, 'run', 'update user set power = ? where uid = ?', oper, uid)
        .then(function(err) {
            if (err) {
                res.sendStatus(500);
                throw err;
            }
            res.sendStatus(200);
        })
        .catch(function(err) {
            error(err);
        });
    }
});

router.post('/userimport', function(req, res, next) {
    userimp.doDefault(function(err) {
        if (err) {
            error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;