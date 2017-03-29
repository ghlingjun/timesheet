const request_host = "http://192.168.1.184:8080/application-war/dataapi/";
//const request_host = "http://localhost:91/";        //启用模拟服务器数据
const request = require('request');
const rp = require('request-promise');
const Promise = require('bluebird');
//get http headers
function getHeaders(userInfo) {
    var _header = {};
    if(userInfo) {
        _header["tm-header-userid"] = userInfo.userId;
        _header["tm-header-nonce"] = userInfo.nonce;
        _header["tm-header-curtime"] = userInfo.curTime;
        _header["tm-header-companyid"] = userInfo.companyId;
        _header["tm-header-signature"] = userInfo.signature;
    }
    return _header;
}
//提供promise 直渲数据
function getRequestPromise(options) {
    //var userInfo = options.req.session.userInfo;
    var userInfo = JSON.parse(options.req.cookies.userInfo);
    var _header = getHeaders(userInfo);
    var urls = options.urls;
    var rps = [];
    for(var i=0; i< urls.length;i++) {
        var _param = urls[i].body || {};
        var opts = {
            method:"post",
            baseUrl:config.host,
            uri: urls[i].originalUrl,
            headers: _header,
            body:JSON.stringify(_param),
            json:false
        }
        rps.push(rp(opts));
    }
    Promise.all(rps).then(function(data){
        var body = [];
        for(var i=0;i<data.length;i++) {
            var _data = data[i];
            if(_data){
               var obj = JSON.parse(_data);
                body.push(obj);
            }
        }
        options.callback(body);
    });

}
//提供node直渲数据
function getSyncRequest(options) {
    var _param = options.body || {};
    //var userInfo = options.req.session.userInfo;
    var userInfo = options.req.cookies.userInfo;
    if(userInfo) {
        userInfo = JSON.parse(userInfo);
    }
    var _header = getHeaders(userInfo);
    var opts = {
        method:"post",
        baseUrl:config.host,
        uri: options.originalUrl,
        headers: _header,
        body:JSON.stringify(_param),
        //agent: false,
        json:false
    };
    request(opts, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            if(body != "") {
                body = JSON.parse(body);
                options.callback(body);
            }else{
                var _header = response.headers;
                var errMsg = _header["tm-header-errmsg"];
                var status = _header["tm-header-status"];
                options.callback({
                    code:status,
                    message:errMsg
                });
            }
        }else {
            console.log(error);
        }
    })
}
//提供异数回调数据
function getRequest(options) {
    var req = options.request;
    var _param = req.body || {};//post
    /*if(!_param.body){
     _param.body = {};
     }*/
    var _header = {};
    _header["tm-header-userid"] = req.headers["tm-header-userid"];
    _header["tm-header-nonce"] = req.headers["tm-header-nonce"];
    _header["tm-header-curtime"] = req.headers["tm-header-curtime"];
    _header["tm-header-companyid"] = req.headers["tm-header-companyid"];
    _header["tm-header-signature"] = req.headers["tm-header-signature"];
    var opts = {
        method:"post",
        baseUrl:config.host,
        uri: req.originalUrl,
        headers: _header,
        body:JSON.stringify(_param),
        //agent: false,
        json:false
    };
    request(opts, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            if(body != "") {
                body = JSON.parse(body);
                options.callback(body);
            }else{
                var _header = response.headers;
                var errMsg = _header["tm-header-errmsg"];
                var status = _header["tm-header-status"];
                req.res.status(501).send({status:status,errMsg:errMsg});
                /*options.callback({
                 code:status,
                 message:errMsg
                 });*/
                //response.sendStatus(response.statusCode);
            }

        }else {
            console.log(error);
        }
    })
}
function getCallback(req, res, next) {
    getRequest({
        request:req,
        callback:function (result) {
            res.json(result);
        }
    })
}

const config = {
    host:request_host,
    request:getRequest,
    syncRequest:getSyncRequest,
    requestPromise:getRequestPromise,
    callback:getCallback,
    message:"配置全局方法..."
};

module.exports = config;