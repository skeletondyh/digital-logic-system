var express = require('express');
var router = express.Router();
var tp = require('../tiny-promise');
var dbtop = require('../db/dbtop');
var debug = require('debug');
var log = debug('prj7_tot:problem:edit:log');
var error = debug('prj7_tot:problem:edit:error');

router.all('*', function(req, res, next) {
    if (req.session.power && req.session.power > 0) {
        next();
    } else {
        res.send('Permission denied.');
    }
});

var limitNames = [
    'draw2d_circuit_switch_HighLow', 
    'draw2d_circuit_display_Led',
    'draw2d_circuit_switch_PushButton',
    'C74LS00', 
    'C74LS04', 
    'C74LS11', 
    'C74LS14', 
    'C74LS20', 
    'C74LS27',
    'C74LS86',
    'C74LS90',
    'C74LS161',
    'draw2d_circuit_decoder_BCDto7Seg',
    'draw2d_circuit_display_7Segment'
    ];

function isSandBox(pid)
{
    return pid < 1002;
}

router.get('/:pid', function(req, res, next) {
    var pid = req.params.pid;
    if (pid === 'new') {
        res.render('problem-edit', {
            title : '编辑' + pid,
            pid : pid,
            check : true,
            limits : {},
            limitNames : limitNames,
            data : {
                title : '新建'
            }
        });
    } else {
        var db = dbtop.db();
        tp.promisify.call(db, 'get', 'select * from problem where pid = ?', parseInt(pid))
        .then(tp.spread(function(err, row) {
            if (err) throw err;
            if (!row) throw {
                status: 404,
                message: 'cannot find problem #' + pid
            };
            res.render('problem-edit', {
                limits : JSON.parse(row.limited),
                title : '编辑' + pid,
                pid : pid,
                check : !isSandBox(pid),
                limitNames : limitNames,
                data : row
            });
        }))
        .catch(function(err) {
            error(err);
            next(err);
        });
    }
});

router.post('/:pid', function(req, res, next) {
    var title = req.body.title;
    var source = req.body.source;
    var limited = req.body.limits || '{}';
    var description = req.body.description;
    var pid = req.params.pid;
    var db = dbtop.db();
    log('limit:', limited);
    if (pid === 'new') {
        tp.promisify.call(db, 'run', 'insert into problem (title,source,limited,description) values (?, ?, ?, ?)', title, source, limited, description)
        .then(function(err) {
            if (err) {
                error(err);
                res.status(500).send('bad');
            } else {
                dbtop.env.addProblem();
                res.status(200).send(
                    (dbtop.env.getProblemCount() + 999).toString());
            }
        });
    } else {
        tp.promisify.call(db, 'run', 'update problem set title = ?, source = ?, limited = ?, description = ? where pid = ?', title, source, limited, description, pid)
        .then(function(err) {
            if (err) {
                error(err);
                res.status(500).send('bad');
            } else {
                res.sendStatus(200);
            }
        });
    }
});

module.exports = router;