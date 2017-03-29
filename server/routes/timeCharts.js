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
    var html = template('timeCharts', {title:"工时项目"});
    res.send(html);
});
router.get('/timeCharts', function(req, res, next) {
    var data = {
        title: '工时项目',
        time: (new Date).toString()
    };
   /* var opts1={
        method:"POST",
        uri:"http://127.0.0.1:91/workhour/timeCharts.do",
        json:true
    };
    var opts2={
        method:"POST",
        uri:"http://127.0.0.1:91/workhour/basicConfigDetail.do",
        json:true
    };*/


});
module.exports = router;
