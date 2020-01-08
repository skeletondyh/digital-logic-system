var multer = require('multer');
var lemon = require('../sim/lemon');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/tmp/motivate'); // . 是项目根目录，与require不同
    },
    filename: function(req, file, cb) {
        var name = req.params.token + '.vhd';
        cb(null, name);
    }
});

var reciever = multer({ storage: storage });

var express = require('express');
var router = express.Router();
var dbtop = require('../db/dbtop');

router.post('/motivate/:token', reciever.single('motivate'), function(req, res, next) {
    // 接受上传的激励文件
    // 解开锁，就绪
    lemon.submit(req.params.token, 1);
    res.sendStatus(200);
});

var std_kinds = {
    'motivate' : true,
    'input' : true,
    'answer' : true
};
var extensionsOf = {
    'motivate' : 'vhd',
    'input' : 'in',
    'answer' : 'ans'
};
var stdStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        var kind = req.params.kind;
        if (std_kinds[kind] && req.session.power > 0) {
            cb(null, './sim/' + kind);
        } else {
            cb({
                pure : true,
                status : 403,
                message: '不能识别的类型或权限不足'
            });
        }
    },
    filename: function(req, file, cb) {
        var kind = req.params.kind;
        var name = req.params.pid + '.' + extensionsOf[kind];
        cb(null, name);
    }
});

var stdReciever = multer({ storage: stdStorage });
router.post('/std/:kind/:pid', stdReciever.single('stdfile'), function(req, res, next) {
    // 响应
    res.sendStatus(200);
});

var userImportStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        if (req.session.power > 1) {
            cb(null, './db');
        } else {
            cb({
                pure : true,
                status : 403,
                message : 'Permission denied.'
            });
        }
    },
    filename: function(req, file, cb) {
        cb(null, 'userImport.txt');
    }
});

var userImportReciever = multer({ storage: userImportStorage });
router.post('/admin/userimport', userImportReciever.single('importfile'), function(req, res, next) {
    res.status(200).send('上传完成');
})

module.exports = router;