var express = require('express');
var router = express.Router();
var tp = require('../tiny-promise');
var dabs = require('../db/dbtop');
var md5 = require('js-md5');
var debug = require('debug');
var log = debug('prj7_tot:register:log');
var error = debug('prj7_tot:register:error');

var regSwitch = false;

router.get('/state', function(req, res, next) {
    res.status(200).send(regSwitch ? 'open' : 'close');
});

router.post('/toggle', function(req, res, next) {
    var power = req.session.power || 0;
    if (power >= 2) {
        regSwitch = !regSwitch;
        res.sendStatus(200);
    } else {
        res.status(200).send('Permission denied');
    }
});

router.all('*', function(req, res, next) {
    if (regSwitch) {
        next();
    } else {
        next({
            status: 403,
            message: '注册已关闭，请向管理员申请账户或等待注册开放'
        });
    }
});

router.get('/', function(req, res, next) {
    res.render('register');
});

router.get('/nameexists', function(req, res, next) {
    var name = req.query.username;
    if (!name) {
        res.send('bad-username');
        return ;
    }
    var db = dabs.db();
    tp.promisify.call(db, 'get', 'select uid from user where name = ?', name)
    .then(tp.spread(function(err, row) {
        if (err) throw err;
        if (row) {
            res.send('unavailable');
        } else {
            res.send('ok');
        }
    }))
    .catch(function(err) {
        res.sendStatus(500);
        error(err);
    });
});

var getSalt = function() {
    return Math.random().toString(36).substr(2) + ':' + new Date().getTime();
};

// 响应 ajax, 成功则重定向
router.post('/', function(req, res, next) {
    var salt = getSalt();
    var username = req.body.username;
    var nickname = req.body.nickname;
    var password = md5(req.body.password + salt);
    var db = dabs.db();
    log(username, nickname, password);
    tp.promisify.call(db, 'run', 'INSERT INTO user (name, nickname, password, salt) values (?, ?, ?, ?)', username, nickname, password, salt)
    .then(function(err) {
        if (err) {
            res.send('crash');
        } else {
            res.send('ok');
        }
    });
})

module.exports = router;