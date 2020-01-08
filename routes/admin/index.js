/**
 * Created by kinnplh on 10/18/16.
 */
var express = require('express');
var user = require('../../dataBase/model/user');
var message = require('../../dataBase/model/message');
var router = express.Router();

router.get('/', function (req, res, next) {
    if(!req.session.user) {
        res.redirect('/');
    }
    user.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else if(req.session.user.authority == 0) {
            //res.json({status:'YOU ARE NOT ALLOWED'});
            res.redirect('/');
        }
        else {
            res.render('admin/index');
        }
    });
});

router.get('/broadcast', function(req, res, next){
    if(!req.session.user) {
        //console.log("empty");
        res.redirect('/');
    }
    //console.log(req.session);
    user.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else if(req.session.user.authority == 0) {
            res.redirect('/');
        }
        else {
            var messageList = [];
            message.find({},function(err,msgList){
                console.log("msgList: "+msgList);
                if (err){
                    return;
                }
                messageList = msgList;
                console.log("messageList: "+messageList);
                res.render('admin/broadcast',{
                    messageList: messageList
                });
            });
        }
    });
});

router.get('/detail', function (req, res, next) {
    if(!req.session.user) {
        res.redirect('/');
    }
    user.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else if(req.session.user.authority == 0) {
            res.redirect('/');
        }
        else {
            res.json({
                status: "TBC"
            });
        }
    });
});


module.exports = router;