
/**
 * Created by sky.cai on 2017/3/8.
 */

var express = require('express');
var router = express.Router();
var template = require('art-template');
var config = require('../config');

/* GET login . */
router.post('/origUserLogin.do', function(req, res, next) {
    config.request({
        request:req,
        callback:function (result) {
            res.json(result);
        }
    });
});

router.post('/origUserAuth.do', function(req, res, next) {
    var companyId = req.headers['tm-header-companyid'];
    var userId = req.headers['tm-header-userid'];
    var nonce = req.headers['tm-header-nonce'];
    var curTime = req.headers['tm-header-curtime'] || new Date().getTime();
    var signature = req.headers['tm-header-signature'];
    //redis
    /*var db = require('../model/redis');
    //设置值
    db.setObject('test_companyId',{companyid:companyId,userid:userId}, '360000', function(err,result){
        if (err) {
            console.log(err);
            return;
        }
        console.log('插入数据结果obj:', result);
    })

    db.getObject('test_companyId', function(err,result){
        if (err) {
            console.log(err);
            return;
        }
        console.log("db7777:"+JSON.stringify(result));
    })*/

    var userInfo = {
        companyId:companyId,
        userId:userId,
        nonce:nonce,
        curTime:curTime,
        signature:signature
    }
    config.request({
        request:req,
        callback:function (result) {
            req.session.userInfo = userInfo;
            res.json(result);
        }
    })
});

module.exports = router;

