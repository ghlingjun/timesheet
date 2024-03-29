
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
            //req.session.userInfo = userInfo;
            //config.userInfo = userInfo; maxAge:360*1000,
            userInfo.refreshToken = result.refreshToken;
            userInfo.accessToken = result.accessToken;
            userInfo.tokenType = result.tokenType;
            userInfo.softwareCode = "WHK";
            res.cookie('userInfo', JSON.stringify(userInfo), {
                path:'/', httpOnly:true
            });
            res.json(result);
        }
    })
});

module.exports = router;

