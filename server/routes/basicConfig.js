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


// 基础配置 / 规则设置
router.get('/', function(req, res, next) {
    var html = template('basicConfig', {
        title: "基础设置",
        time: (new Date).toString()
    });
    res.send(html);
});

// 任务配置
router.get('/taskConfig', function(req, res, next) {
    var html = template('taskConfig', {
        title: "任务配置",
        time: (new Date).toString()
    });
    res.send(html);
});

// 词典管理
router.get('/versionName', function(req, res, next) {
    var html = template('versionName', {
        title: "版本名称",
        time: (new Date).toString()
    });
    res.send(html);
});

// 权限分配
router.get('/rightsAllotment', function(req, res, next) {
    var html = template('rightsAllotment', {
        title: "权限分配",
        time: (new Date).toString()
    });
    res.send(html);
});

// 职能组
router.get('/functionTeam', function(req, res, next) {
    var html = template('functionTeam', {
        title: "职能组",
        time: (new Date).toString()
    });
    res.send(html);
});

module.exports = router;
