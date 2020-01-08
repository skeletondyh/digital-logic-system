var express = require('express');
var router = express.Router();
var user = require('../dataBase/model/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    if(!req.session.user) {
        res.redirect('/');
    }
    user.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else {
            res.send('respond with a resource');
        }
    });
});

module.exports = router;
