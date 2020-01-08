var express = require('express');
var router = express.Router();

function isSandBox(pid) {
    return pid < 1002;
}

router.get('/code/:pid', function(req, res, next) {
    var pid = req.params.pid;
    res.render('editor-code', { 
        motivate : isSandBox(pid),
        title : '编辑#' + pid,
        pid : pid
    });
});

router.get('/visual/:pid', function(req, res, next) {
    var pid = req.params.pid;
    res.render('editor-visual', { 
        motivate : isSandBox(pid),
        title : '编辑#' + pid,
        pid : pid
    });
});

module.exports = router;