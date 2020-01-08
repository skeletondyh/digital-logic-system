var express = require("express");
var router = express.Router();
var md5Salt_auth = require("../db/dbtop").md5Salt_auth;
var debug = require('debug');
var log = debug('prj7_tot:auth:log');
var error = debug('prj7_tot:auth:error');

router.get('/logout', function(req, res, next) {
    req.session.uid = null;
    req.session.user = null;
    req.session.password = null;
    req.session.nickname = null;
    req.session.power = null;
    res.redirect('/');
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: '登录'});
});

router.post('/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    log(username, password);
    md5Salt_auth(username, password, function(err, row) {
        if (err) {
            error(err);
        }
        if (row) {
            req.session.uid = row.uid;
            req.session.power = row.power;
            req.session.user = username;
            req.session.nickname = row.nickname;
            res.redirect('/');
        } else {
            res.redirect('#err');
        }
    });
});

module.exports = router;