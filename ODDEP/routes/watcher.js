var express = require('express');
var router = express.Router();
var dabs = require('../db/dbtop');
var tp = require('../tiny-promise');

var statusMapCode = {
    'done' : 0,
    'running' : 1,
    'in queue' : 2,
    'failed' : 100,
    'AC' : 0,
    'WA' : 100
};

var page_items = 20;
var ioffset = 4;

router.get('/', function(req, res, next) {
    var db = dabs.db();
    var index = req.query.index || 1;
    if (typeof(index) === 'string') index = parseInt(index);
    var pager = {};
    var list = [];
    // 处理fileter
    var query = {};
    if (req.query.user) query['user.name'] = req.query.user;
    if (req.query.pid) query['submission.pid'] = req.query.pid;
    if (req.query.tag) query['submission.tag'] = req.query.tag;

    var qhead = 'select * from submission inner join user on user.uid = submission.uid'
    tp.promisify.call(db, 'all', qhead + dabs.obj2Stmt('where', query, {sep:'and'}) + 'ORDER BY id DESC')
    .then(tp.spread(function(err, rows) {
        if (err) throw err;
        var la = Math.ceil(rows.length / page_items);
        if (index === 0) index = la;
        var r = (index - 1) * page_items;
        // build pager
        pager.now = index;
        if (index > 1) pager.left = true;
        if (index < la) pager.right = true;
        pager.nums = [];
        for (var i = index - ioffset; i < index + ioffset; ++i)
        {
            if (i > 0 && i <= la) pager.nums.push(i);
        }
        // build list
        for (var i = 0; i < 20 && i + r < rows.length; ++i) {
            var j = i + r;
            list[i] = {
                id : rows[j].id,
                user : rows[j].nickname,
                pid : rows[j].pid,
                tag : rows[j].tag,
                status : rows[j].status,
                code: statusMapCode[rows[j].status],
                time : rows[j].submit_time
            }
        }
        res.render('status', {
            title: 'STATUS',
            list: list,
            pager: pager,
            needPageFooter: {
                time: new Date().toString()
            }
        });
    }));
});

router.get('/submission/:id/', function(req, res, next) {
    db = dabs.db();
    var id = req.params.id;
    var result = { title: '提交#' + id + '结果'};
    tp.promisify.call(db, 'get', 'select * from submission where id = ?', id)
    .then(tp.spread(function(err, row) {
        if (err) throw err;
        result.submission = row;
        if (row.uid === req.session.uid) {
            return true;
        } else {
            return tp.promisify.call(db, 'get', 'select power from user where name = ?', 
                req.session.user)
                .then(tp.spread(function(err, row) {
                    if (err) throw err;
                    if (row.power > 0) return true;
                    else return false;
                }));
        }
    }))
    .then(function(permit) {
        if (!permit) {
            res.send('Permission denied.');
        } else {
            res.render('result', result);
        }
    }).catch(function(err) {
        err.message = 'Bad Server';
        next(err);
    });
});

var filnameEnd = {
    'code' : '.vhd',
    'motivate' : '.vhd',
    'vcd' : '.vcd'
}
router.get('/download/:type/:token', function(req, res, next) {
    var typ = req.params.type;
    if (filnameEnd[typ]) {
        var token = req.params.token;
        var path = './public/tmp/' + typ + '/' + token + filnameEnd[typ];
        var name = typ + '-' + token.substr(token.indexOf('-') + 1) + filnameEnd[typ];
        res.download(path, name);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;