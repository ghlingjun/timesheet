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
    var html = template('projectList', {title:"工时项目"});
    res.send(html);
});
router.get('/projectTask', function(req, res, next) {
    var data = {
        title: '工时项目',
        time: (new Date).toString(),
    };
    var opts1={
        method:"POST",
        uri:"http://127.0.0.1:91/workhour/projectquery.do",
        json:true
    };
    var opts2={
        method:"POST",
        uri:"http://127.0.0.1:91/workhour/planBriefQuery.do",
        json:true
    };
    var rp1=rp(opts1);
    var rp2=rp(opts2);
    Promise.all([rp1,rp2]).then(function(datas){
        data.list1=datas[0];
        data.list2=datas[1];
        var html=template("projectTask",data);
        res.send(html);
    });
    /*request(opts,function (error,response,body) {
        data.list=body;
        var html=template("projectTask",data);
        res.send(html);
    })*/

});
module.exports = router;