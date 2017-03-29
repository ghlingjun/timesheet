var express = require('express');
var router = express.Router();
var template = require('art-template');
var rp = require('request-promise');
var Promise = require('bluebird');
var request = require('request');
var config=require('../config');
var urls = require("../public/assets/js/modules/urls");

router.get('/',function (req,res,next) {
    var info={
        title:"计划审核",
    }
    var userInfo=JSON.parse(req.cookies.userInfo);
    var softwareCode=userInfo.softwareCode;
    var accrssToken=userInfo.accessToken;
    var tokenType=userInfo.tokenType;
    config.syncRequest({
        req:req,
        originalUrl:urls.workhour.projectQuery,
        body:{
            softwareCode:softwareCode,
            accessToken:accrssToken,
            tokenType:tokenType
        },
        callback:function (data) {
            info.list1=data.projects;
            var html=template('planApproval',info);
            res.send(html);
        }
    })
})
router.get('/:planTask',function (req,res,next) {
    var info={
        title:"计划审核",
        planName:req.query.planName,
        versionName:req.query.versionName,
        submitTime:req.query.submitTime,
        managerName:req.query.managerName,
    }
    config.syncRequest({
        req:req,
        originalUrl:urls.workhour.projectQuery,
        body:{},
        callback:function (data) {
            info.list1=data;
            var html=template('planTask',info);
            res.send(html);
        }
    })
})
module.exports = router;