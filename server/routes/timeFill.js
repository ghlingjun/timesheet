/**
 * Created by cde.chen on 17-3-14.
 */
var express = require('express');
var router = express.Router();
var template = require('art-template');
var rp = require('request-promise');
var Promise = require('bluebird');
var request = require('request');
//var config=require('../config');
//const urls = require("../public/assets/js/modules/urls")
/* GET login . */
router.get('/', function(req, res, next) {
    var html = template('timeFill', {title:"工时项目"});
    res.send(html);
});
router.get('/timeFill', function(req, res, next) {
    var data = {
        title: '工时项目',
        time: (new Date).toString()
    };
   /* var opts1={
        method:"POST",
        uri:"http://127.0.0.1:91/workhour/basicConfigSave.do",
        json:true
    };
    var opts2={
        method:"POST",
        uri:"http://127.0.0.1:91/workhour/basicConfigDetail.do",
        json:true
    };
    var rp1=rp(opts1);
    var rp2=rp(opts2);
    Promise.all([rp1,rp2]).then(function(datas){
        data.list1=datas[0];
        data.list2=datas[1];
        var html=template("projectTask",data);
        res.send(html);
    });*/
    /*request(opts,function (error,response,body) {
     data.list=body;
     var html=template("projectTask",data);
     res.send(html);
     })*/

});

router.get('/detail', function(req, res, next) {
    var workPeriodFromDate = req.query.workPeriodFromDate;
    var workPeriodToDate = req.query.workPeriodToDate;
    var approvalSubmitDate = req.query.approvalSubmitDate;
    var workPeriodWorkhours = req.query.workPeriodWorkhours;
    var approvalUser = req.query.approvalUser;
    var html = template('timeFillDetail', {
        title:"工时系统",
        workPeriodFromDate:workPeriodFromDate,
        workPeriodToDate:workPeriodToDate,
        workPeriodWorkhours:workPeriodWorkhours,
        approvalSubmitDate:approvalSubmitDate,
        approvalUser:approvalUser
    });
    res.send(html);
});
module.exports = router;
