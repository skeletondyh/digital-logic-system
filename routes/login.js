/**
 * Created by kinnplh on 2016/10/3.
 *
 */

var http = require('http');
var https = require('https')
var queryString = require('querystring');

var express = require('express');
var router = express.Router();
var user = require('../dataBase/model/user');
var project = require('../dataBase/model/project');
var message = require('../dataBase/model/message');
var example = require('../dataBase/model/example');
//var async = require('async');

/* router.get('/authorize', function (req, res, next) {

    if(res.locals.user && res.locals.user.authority === 0)
    {
        message.find({}).populate('author').exec(function (err, objj) {
            if(err) res.render('error', {error: err});
            var messageBox = [];
            if(objj !== null) {
                for (var i = 0; i < objj.length; i++) {
                    var Onemsg = {
                        _id: objj[i]._id,
                        title: objj[i].title,
                        content: objj[i].content,
                        date: objj[i].createTime,
                        author: objj[i].author.userName
                    };
                    messageBox.push(Onemsg);
                }
            }

            example.find({}).exec(function (err, exampleobj) {
                if(err) res.render('error', {error: err});
                var exampleBox = [];
                if(exampleobj !== null) {
                    for(var i = 0; i < exampleobj.length; i++) {
                        if(exampleobj[i].ifvisibletoUser){
                            exampleBox.push(exampleobj[i]);
                        }
                    }
                }

                user.findById(res.locals.user._id).populate({
                    path: 'homeworkBox',
                    populate: {path: 'homework'}
                }).populate('projectBox')
                    .exec(function (err, obj) {
                        if(err) res.render('error', {error: err});
                        req.session.user = {
                            userName: obj.userName,
                            password: obj.password,
                            authority: obj.authority,
                            _id: obj._id,
                            uniquetoken: obj.uniquetoken
                        };
                        res.locals.user = req.session.user;
                        res.locals.hasLogin = true;
                        res.render('index', {
                            title: "Index",
                            projectList: obj.projectBox.reverse(),
                            homeworkList: obj.homeworkBox.reverse(),
                            messagelist: messageBox.reverse(),
                            exampleList: exampleBox.reverse()
                        });
                    });

            });
        });
    }
    else if(res.locals.user && res.locals.user.authority === 1)
        res.redirect('/admin');
    else {

        var client_code = req.query.code;

        var post_data = queryString.stringify({
            client_id: 'lOew9-ZNBAcHLGKnw6ooaiNj2lU',
            client_secret: 'ldrsKdfS85EpArpK6MTL',
            code: client_code
        });

        var opt = {
            hostname: 'accounts.net9.org',
            path: '/api/access_token',
            method: 'POST'
        };

        opt.headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': post_data.length
        };

        var result = '';
        var token = '';

        var post_req = https.request(opt, function (res_post) {
            res_post.on('data', function (buffer) {
                result += buffer.toString();
            });

            res_post.on('end', () => {

                console.log(result);
                var obj = JSON.parse(result);
                //console.log(obj.access_token);

                token = obj.access_token;
                var opt2 = {
                    hostname: 'accounts.net9.org',
                    path: '/api/userinfo?access_token=' + token,
                    method: 'GET'
                };

                var get_result = '';

                var get_req = https.request(opt2, function (res_get) {
                    res_get.on('data', function (buffer) {
                        get_result += buffer.toString();
                    });
                    res_get.on('end', function () {
                        var user_obj = JSON.parse(get_result);
                        //console.log(user_obj.user.name);

                        user.findOne({userName: user_obj.user.name})
                            .exec((function () {
                                return function (err, retUser) {
                                    if (retUser != null) {
                                        user.update({userName: user_obj.user.name}, {uniquetoken: token}, {multi: true}, function (err, docnum) {
                                            if (err) console.log(err);
                                            console.log(user_obj.user.name + "Successfully Updated");
                                            user.findOne({userName: user_obj.user.name})
                                                .populate({
                                                    path: 'homeworkBox',
                                                    populate: {path: "homework"}
                                                })
                                                .populate('projectBox')
                                                .exec(function (err, obj) {
                                                    req.session.user = {
                                                        userName: obj.userName,
                                                        _id: obj._id,
                                                        password: obj.password,
                                                        authority: obj.authority,
                                                        uniquetoken: token
                                                    };
                                                    //req.session.user.uniquetoken = token;
                                                    //req.session.user = obj;
                                                    res.locals.hasLogin = true;
                                                    res.locals.user = req.session.user;
                                                    console.log('Find A Existed User Logged in via Accounts9');
                                                    //console.log("MsgBox: ", obj.msgBox);
                                                    /*msg.findById(obj.msgBox).exec(function (err, reobj) {
                                                    msg.findById(obj.msgBox).exec(function (err, reobj) {
                                                        //attention = reobj.content;
                                                        //console.log(attention);
                                                        if (obj.authority == 0) {
                                                            //console.log(obj.msgBox.content);
                                                            console.log(obj.userName);
                                                            res.render('index', {
                                                                title: "Index",
                                                                projectList: obj.projectBox.reverse(),
                                                                homeworkList: obj.homeworkBox.reverse(),
                                                                //contents: attention
                                                            });
                                                        }
                                                        else
                                                            res.redirect('/admin');
                                                        });*/
                                                    /*message.find({}).populate('author').exec(function (err, objj) {
                                                        if(err) res.render('error', {error: err});
                                                        var messageBox = [];
                                                        for(var i = 0; i < objj.length; i++) {
                                                            var Onemsg = {
                                                                _id: objj[i]._id,
                                                                title: objj[i].title,
                                                                date: objj[i].createTime,
                                                                author: objj[i].author.userName
                                                            };
                                                            messageBox.push(Onemsg);
                                                        }
                                                    })
                                                    if (obj.authority === 0) {
                                                            //console.log(obj.msgBox.content);
                                                        message.find({}).populate('author').exec(function (err, objj) {
                                                            if(err) res.render('error', {error: err});
                                                            var messageBox = [];
                                                            if(objj !== null) {
                                                                for(var i = 0; i < objj.length; i++) {
                                                                    var Onemsg = {
                                                                        _id: objj[i]._id,
                                                                        title: objj[i].title,
                                                                        content: objj[i].content,
                                                                        date: objj[i].createTime,
                                                                        author: objj[i].author.userName
                                                                    };
                                                                    messageBox.push(Onemsg);
                                                                }
                                                            }

                                                            example.find({}).exec(function (err, exampleobj) {
                                                                if(err) res.render('error', {error: err});
                                                                var exampleBox = [];
                                                                if(exampleobj !== null) {
                                                                    for(var j = 0; j < exampleobj.length; j++){
                                                                        if(exampleobj[i].ifvisibletoUser) {
                                                                            exampleBox.push(exampleobj[i]);
                                                                        }
                                                                    }
                                                                }

                                                                res.render('index', {
                                                                    title: "Index",
                                                                    projectList: obj.projectBox.reverse(),
                                                                    homeworkList: obj.homeworkBox.reverse(),
                                                                    messagelist: messageBox.reverse(),
                                                                    exampleList: exampleBox
                                                                });

                                                            });
                                                                //contents: attention
                                                        });

                                                    }
                                                    else
                                                        res.redirect('/admin');
                                                });
                                        });
                                    }
                                    else {
                                        var newUser = new user({
                                            userName: user_obj.user.name,
                                            password: user_obj.user.password,
                                            uniquetoken: token,
                                            projectBox: [],
                                            homeworkBox: [],
                                            //msgBox: {},
                                            authority: 0,
                                            group: "CST54"
                                        });

                                        // make a test admin
                                        if (user_obj.user.name === 'kinnplh') {
                                            newUser.authority = 1;
                                            //console.log('bronysam');
                                            //console.log(newUser.authority);
                                        }


                                        newUser.save(function (err) {
                                            if (err) res.render("error", {error: err});
                                            console.log(err);
                                            console.log("Insert A New User Logged in via Accounts9");
                                            console.log(user_obj.user.name);
                                            user.findOne({userName: user_obj.user.name})
                                                .populate({
                                                    path: 'homeworkBox',
                                                    populate: {path: "homework"}
                                                })
                                                .populate('projectBox')
                                                .exec(function (err, obj) {
                                                    console.log('obj:  ');
                                                    console.log(obj);
                                                    req.session.user = {
                                                        userName: obj.userName,
                                                        _id: obj._id,
                                                        password: obj.password,
                                                        authority: obj.authority,
                                                        uniquetoken: token
                                                    };
                                                    //req.session.user.uniquetoken = token;
                                                    //req.session.user = obj;
                                                    res.locals.hasLogin = true;
                                                    res.locals.user = req.session.user;
                                                    //console.log('Insert a user');
                                                    if (obj.authority === 0) {
                                                        message.find({}).populate('author').exec(function (err, objj) {
                                                            if (err) res.render('error', {error: err});
                                                            var messageBox = [];
                                                            if(objj !== null) {
                                                                for (var i = 0; i < objj.length; i++) {
                                                                    var Onemsg = {
                                                                        _id: objj[i]._id,
                                                                        title: objj[i].title,
                                                                        content: objj[i].content,
                                                                        date: objj[i].createTime,
                                                                        author: objj[i].author.userName
                                                                    };
                                                                    messageBox.push(Onemsg);
                                                                }
                                                            }

                                                            example.find({}).exec(function (err, exampleobj) {
                                                                if(err) res.render('error', {error: err});
                                                                var exampleBox = [];
                                                                if(exampleobj !== null) {
                                                                    for (var j = 0; j < exampleobj.length; j++) {
                                                                        if(exampleobj[j].ifvisibletoUser) {
                                                                            exampleBox.push(exampleobj[j]);
                                                                        }
                                                                    }
                                                                }

                                                                res.render('index', {
                                                                    title: "Index",
                                                                    projectList: obj.projectBox.reverse(),
                                                                    homeworkList: obj.homeworkBox.reverse(),
                                                                    messagelist: messageBox.reverse(),
                                                                    exampleList: exampleBox
                                                                });
                                                            });
                                                        });
                                                    }
                                                    else
                                                        res.redirect('/admin');
                                                });
                                        });
                                    }
                                };
                            })());
                    });
                });

                get_req.end();
            });
        });

        post_req.write(post_data);
        post_req.end();
    }
});
*/



router.get('/login', function (req, res) {

    res.render('login', {pathNav : [{link: "/login", name: "login"}]});

});

// 增加内置好的用户 没有帐号的再用accounts9登录
// 现在先用accounts9

router.post('/login',function (req, res) {
    var username = req.body.userName;
    var password = req.body.password;

    user.findOne({userName:username})
        .populate({
            path: 'homeworkBox',
            populate: {path: "homework"}
        })
        .populate('projectBox')
        .exec(function (err, obj) {
            
            var errorMsg = '';

            if(obj === null)
                errorMsg = "No such user.";
            else if(obj.password !== password)
                errorMsg = "Permission denied.";

            if(errorMsg.length != 0)
                res.render('login', {errMsg: errorMsg});
            else {
                req.session.user = {
                    userName: obj.userName,
                    _id: obj._id,
                    password: obj.password,
                    authority: obj.authority
                    // uniquetoken: obj.uniquetoken
                };
                //req.session.user = obj;
                res.locals.hasLogin = true;
                res.locals.user = req.session.user;
                
                //console.log("1---------------req.session.user ", req.session.user);

                if(obj.authority === 0) {
                    message.find({}).populate('author').exec(function (err, msgobj) {
                        if (err) res.render('error', {error: err});
                        var messageBox = [];
                        if(msgobj !== null) {
                            for (var i = 0; i < msgobj.length; i++) {
                                var Onemsg = {
                                    _id: msgobj[i]._id,
                                    title: msgobj[i].title,
                                    content: msgobj[i].content,
                                    date: msgobj[i].createTime,
                                    author: msgobj[i].author.userName
                                };
                                messageBox.push(Onemsg);
                            }
                        }

                        example.find({}).exec(function (err, exampleobj) {
                            if (err) res.render('error', {error: err});
                            var exampleBox = [];
                            if(exampleobj !== null) {
                                for(var j = 0; j < exampleobj.length; j++) {
                                    if(exampleobj[j].ifvisibletoUser) {
                                        exampleBox.push(exampleobj[j]);
                                    }
                                }
                            }

                            res.render('index', {
                                title: "Index",
                                projectList: obj.projectBox.reverse(),
                                homeworkList: obj.homeworkBox.reverse(),
                                messagelist: messageBox.reverse(),
                                exampleList: exampleBox
                            });
                        });
                    });
                }
                else
                    res.redirect('/admin');
            }
        });
});

/* router.get('/accounts9', function (req, res) {
    res.redirect('https://accounts.net9.org/api/authorize?client_id=lOew9-ZNBAcHLGKnw6ooaiNj2lU&redirect_uri=http://183.172.169.23:3000/authorize');
});
*/

router.get('/logout', function (req, res) {
    req.session = null;
    res.locals.user = undefined;
    res.locals.hasLogin = false;
    res.locals.project = undefined;
    res.locals.newHw = undefined;
    res.redirect('/');
});

module.exports = router;
