/**
 * @return {[type]} 接口 ajaxSend
 */
var tms = tms || {};

(function($) {
	//ajax封装
	this.ajax = function(options,ajaxType) {
        var activeHost = '/';
		//var _head = options.requestHead || {};
		var _params = options.requestBody || {};
		var _path = options.path;
		/*if(!_head.oper) {
			_head.oper = _path;
		}
		var _data = {};
		_data.head = _head;
		_data.body = _params;*/

		$.ajax({
			type: ajaxType,
			url:  _path,
			dataType: "json",
            //contentType: 'application/json',
			/*contentType: 'application/json',
			accepts: "application/json",*/
			data: _params,//JSON.stringify(_params),
			timeout: 1000 * 60, //60秒超时
			beforeSend: function(XHR) {
                var _time = new Date().getTime();
                var message = {};
                message.method = ajaxType;
                message.type = "application/json";
                if(ajaxType == "get") {
                    message.type = "";
                    //message.url = ajax_host + "Api="+options.url + _paramsStr;
                }else{
                    //message.url = ajax_host + "Api="+options.url;
                }
                message.url = "/api"+options.path;
                message.time = Math.floor(_time/1000) + 28800;
                var userInfo = tms.getLocalStorage("userInfo",true);
                if(userInfo) {
                    var token = tms.getToken(message, userInfo.nonce || "");
                    XHR.setRequestHeader("TM-Header-UserId",userInfo.userId);
                    XHR.setRequestHeader("TM-Header-CompanyId",userInfo.companyId);
                    XHR.setRequestHeader("TM-Header-Nonce",userInfo.nonce);
                    XHR.setRequestHeader("TM-Header-CurTime",message.time);
                    XHR.setRequestHeader("TM-Header-SIGNATURE",token);
                    console.log("message:"+JSON.stringify(message)+",secret:"+userInfo.nonce+",token:"+token);
                }
				$.isFunction(options.beforCallback) && options.beforCallback();
				//loading open
			},
			success: function(data) {
				//loading close
				//统一处理null值
				if (data) {
					data = JSON.stringify(data);
					data = JSON.parse(data.replace(/:null/g, ":\"\""));
				}
				$.isFunction(options.callback) && options.callback(data);
			},
			error: function(xhr, errorType, error) {
                //loading close
                if (errorType == "abort") { //无网络
                    alert('网络已断开');
                } else if (errorType == "timeout") { //超时
                    alert('系统连接超时');
                } else if (errorType == "error") { //服务器或者客户端错误
                    switch (xhr.status) {
                        case 403:
                            alert('服务器禁止访问');
                            break;
                        case 404:
                            alert('未找到服务器');
                            break;
                        case 500:
                            alert('服务器未响应');
                            break;
                        case 503:
                            alert('服务器不可用');
                            break;
                        case 504:
                            alert('网关超时');
                            break;
                    }
                }
                $.isFunction(options.errCallback) && options.errCallback();
            }
		});
	};

}).call(tms, jQuery);

var ajaxSend = {};
ajaxSend.get = function(params, path) {
    //默认请求参数
    var dp = {
        path: path,
        //requestHead:'',
        requestBody: '',
        callback: function(response, status) { //回调函数
            //异常处理...
        }
    };
    $.extend(dp, params);
    tms.ajax(dp,"get");
};

ajaxSend.post = function(params, path) {
    //默认请求参数
    var dp = {
        path: path,
        //requestHead:'',
        requestBody: '',
        callback: function(response, status) { //回调函数
            //异常处理...
        }
    };
    $.extend(dp, params);
    tms.ajax(dp,"post");
};