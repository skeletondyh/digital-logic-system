/**
 * Created by lixin on 2016/10/3.
 */

var express = require('express');
var router = express.Router();
var project = require("../dataBase/model/project");
var example = require("../dataBase/model/example");
var submit = require("../dataBase/model/submit");
var user = require('../dataBase/model/user');
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
            var projectId = req.query.projectId;
            var exampleId = req.query.exampleId;
            if (projectId !== undefined){
                project.findById(projectId).populate('homework').populate('submitBox').populate('hwSubmitBox').exec(function (err, retPrj) {
                    var homeworkSubmitList = [];
                    var totalScore = 0;
                    if (retPrj.is_homework == true) {
                        homeworkSubmitList = retPrj.hwSubmitBox.reverse();
                        totalScore = retPrj.homework.totalsimfiles;
                    }

                    res.render('submit',{submitList: retPrj.submitBox.reverse(),
                                        homeworkSubmitList: homeworkSubmitList,
                                        totalScore: totalScore,
                                        pathNav: [{name: retPrj.projectName, link: "/project?projectId="+retPrj._id},
                                        {name: "submitList", link: "/submit?projectId="+retPrj._id}]});
                });
            } else {
                example.findById(exampleId).populate('submitBox').exec(function (err, retPrj) {
                    res.render('submit',{submitList: retPrj.submitBox.reverse(),
                                        homeworkSubmitList: [],
                                        totalScore: 0,
                                        pathNav: [{name: retPrj.projectName, link: "/example?projectId="+retPrj._id},
                        {name: "submitList", link: "/submit?exampleId="+retPrj._id}]});
                });
            }
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
        else {
            var submitId = req.query.submitId;
            submit.findById(submitId).exec(function (err, sbmt) {
                if(sbmt.type)
                    example.findById(sbmt.project).exec(function (err, result) {
                        res.render('file',{
                            simulatem: sbmt.stdMsg,
                            xtime: sbmt.xtime,
                            changelist: JSON.stringify(sbmt.changelist),
                            lastlist: JSON.stringify(sbmt.lastlist),
                            signalname: JSON.stringify(sbmt.signalname),
                            simulationTime: sbmt.simulationTime,
                            pathNav: [{name: result.projectName, link: "/example?projectId="+result._id},
                                {name: "submitList", link: "/submit?exampleId="+result._id},
                                {name: "submitDetails", link: "/submit/detail?submitId="+sbmt._id}]
                        });
                    });
                else // if(sbmt.type === 0)
                    project.findById(sbmt.project).exec(function (err, result) {
                        res.render('file',{
                            simulatem: sbmt.stdMsg,
                            xtime: sbmt.xtime,
                            changelist: JSON.stringify(sbmt.changelist),
                            lastlist: JSON.stringify(sbmt.lastlist),
                            signalname: JSON.stringify(sbmt.signalname),
                            simulationTime: sbmt.simulationTime,
                            pathNav: [{name: result.projectName, link: "/project?projectId="+result._id},
                                {name: "submitList", link: "/submit?projectId="+result._id},
                                {name: "submitDetails", link: "/submit/detail?submitId="+sbmt._id}]
                        });
                    });
            });
        }
    });
});

router.get('/homework', function (req, res, next) {
    if(!req.session.user) {
        res.redirect('/');
    }
    user.findOne({userName:req.session.user.userName}).exec(function (err, obj) {
        if (req.session.user.uniquetoken !== obj.uniquetoken) {
            req.session = null;
            res.redirect('/');
        }
        else {
            var prjId = req.query.projectId;
            var hwId = req.query.homeworkId;
            console.log(prjId);
            project.findById(prjId).populate({
                path: 'hwSubmitBox',
                populate: {
                    path: 'project',
                    populate:{path: 'homework'}
                }
            }).exec(function (err, retPrj) {
                console.log(retPrj.hwSubmitBox[0].project.homework.deadline);
                res.render('homeworkSubmit',{submitList: retPrj.hwSubmitBox.reverse(), pathNav: [{name: retPrj.projectName, link: "/project?projectId="+retPrj._id},
                    {name: "homeworkSubmitList", link: "/submit/homework?projectId="+retPrj._id + "&homeworkId=" + hwId}]});
            });
        }
    });
});




module.exports = router;

