var express = require('express');
var router = express.Router();
var template = require('art-template');
var rp = require('request-promise');
var Promise = require('bluebird');
var request = require('request');
var config=require('../config');
var urls = require("../public/assets/js/modules/urls");
/* GET login . */
router.get('/', function(req, res, next) {
    var html = template('projectList', {title:"工时项目"});
    res.send(html);
});
router.get('/:projectTask', function(req, res, next) {
    var data = {
        title: '工时项目',
        time: (new Date).toString(),
    };
    var userInfo=JSON.parse(req.cookies.userInfo);
    var projectId=req.query.id;
    var softwareCode=userInfo.softwareCode;
    var accrssToken=userInfo.accessToken;
    var tokenType=userInfo.tokenType;
    config.requestPromise({
        req:req,
        urls:[{
            originalUrl:urls.workhour.projectQuery,
            body:{
                softwareCode:softwareCode,
                accessToken:accrssToken,
                tokenType:tokenType
            },
        },{
            originalUrl:urls.workhour.planVersionQuery,
            body:{
                "projectId": projectId,
                "pageIndex": 1,
                "pageSize": 25
            }
        }],
        callback:function (datas) {
            data.list1=datas[0].projects;
            data.list2=datas[1].data;
            var html=template("projectTask",data);
            res.send(html);
        }
    })
});
router.get('/:changeTrace', function(req, res, next) {
    var path=req.params.path;
    var id=path.id;
    var data = {
        title: '工时项目',
        time: (new Date).toString(),
    };
    config.syncRequest({
        req:req,
        originalUrl:urls.workhour.projectQuery,
        body:{id:id},
        callback:function (data) {
            var html = template('projectTaskMotal/changeTrace', {list:data});
            res.send(html);
        }
    });
    /*request(opts,function (error,response,body) {
     data.list=body;
     var html=template("projectTask",data);
     res.send(html);
     })*/

});
module.exports = router;