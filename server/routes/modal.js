var express = require('express');
var router = express.Router();
var template = require('art-template');
var rp = require('request-promise');
var Promise = require('bluebird');
var request = require('request');
var config=require('../config');
var urls = require("../public/assets/js/modules/urls");
router.get('/:changeTrace', function(req, res, next) {

    //var path=req.params.path;
    var id=req.query.id;
    var nm=req.query.name;
    var data = {
        title: '工时项目',
        time: (new Date).toString(),
    };
    config.syncRequest({
        req:req,
        originalUrl:urls.workhour.projectQuery,
        body:{id:id},
        callback:function (data) {
            var html = template('modal/changeTrace', {title:nm});
            res.send(html);
        }
    });
});
module.exports = router;