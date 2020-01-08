/**
 * Created by lixin on 2016/10/3.
 */

var express = require('express');
var router = express.Router();
var modelsim = require('./modelsim.js');
var user = require("../dataBase/model/user");

router.get('/', function (req, res, next) {
    if(!req.session.user) {
        res.redirect('/');
    }
    user.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else {
            res.render('file',{simulatem:modelsim.getsimulateMsg(),xtime:modelsim.getxtime(),changelist:modelsim.getchangelist(),lastlist:modelsim.getlastlist(),signalname:modelsim.getsignalname()});
            console.log(modelsim.getxtime());
            console.log(modelsim.getchangelist());
            console.log(modelsim.getlastlist());
        }
    });
});


module.exports = router;

