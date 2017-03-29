/**
 * Created by asus on 2017/3/1.
 */
var tms = tms || {};

(function($) {
    var me = this;
    me.util = me.util || {};
    /**
     * util.format('yyyy-mm-dd hh-ii-ss', +new Date());
     * @type {[type]}
     * 传入时间戳或时间字符串，获取时间格式含有各种方式，根据yy、mm、dd、hh、ii、ss来替换匹配
     */
    this.util.format = format;
    /**
     * util.time.getDay(+new Date());
     * @type {[type]}
     * 获取星期值
     */
    this.util.getDay = getDay;
    this.util.htmlEncode = htmlEncode;
    this.util.htmlDecode = htmlDecode;
    this.util.json2str = json2str;
    this.util.removeFromArray = removeFromArray;
    this.util.getUrlParam = getUrlParam;
    this.util.historyApproval = historyApproval;
    this.util.approvalReject=approvalReject;
    this.util.approvalPass=approvalPass;
    this.util.submitPlanNext=submitPlanNext;
    this.util.submitPlan=submitPlan;
    // By snowden.xu
    this.util.formatDate = formatDate;

    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    };

    function format(format, timestamp) {

        timestamp = new Date(timestamp);

        var year = timestamp.getFullYear(); //获取完整的年份(4位,1970)
        var month = timestamp.getMonth() + 1 < 10 ? '0' + (timestamp.getMonth() + 1) : timestamp.getMonth() + 1; //获取月份(0-11,0代表1月,用的时候记得加上1)
        var date = timestamp.getDate() < 10 ? '0' + timestamp.getDate() : timestamp.getDate(); //获取日(1-31)

        var hour = timestamp.getHours() < 10 ? '0' + timestamp.getHours() : timestamp.getHours(); //获取小时数(0-23)
        var minite = timestamp.getMinutes() < 10 ? '0' + timestamp.getMinutes() : timestamp.getMinutes(); //获取分钟数(0-59)
        var second = timestamp.getSeconds() < 10 ? '0' + timestamp.getSeconds() : timestamp.getSeconds(); //获取秒数(0-59)

        return format.replace(/y+/ig, year).replace(/m+/ig, month).replace(/d+/ig, date).replace(/h+/ig, hour).replace(/i+/ig, minite).replace(/s+/ig, second);
    }

    function getDay(timestamp) {
        var Day = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
        return Day[timestamp.getDay()];
    }

    function htmlEncode(str) {
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&/g, "&amp;");
        s = s.replace(/</g, "&lt;");
        s = s.replace(/>/g, "&gt;");
        s = s.replace(/ /g, "&nbsp;");
        s = s.replace(/\'/g, "&#39;");
        s = s.replace(/\"/g, "&quot;");
        s = s.replace(/\n/g, "<br>");
        return s;
    }

    function htmlDecode(str) {
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");
        s = s.replace(/<br>/g, "\n");
        return s;
    }

    function json2str(json) {
        var arr = [];
        for (var key in json) {
            arr.push(key + '=' + json[key]);
        }
        return arr.join('&');
    }

    function removeFromArray(item, array) {
        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i] === item) {
                array.splice(i, 1);
                break;
            }
        }
        return array;
    }

    //历史审批
    function historyApproval(data) {
        var d=data;
        var htmlBody=[];
        var hisId=null;
        for(var i=0;i<data.length;i++){
            if(!hisId|| hisId!=data[i].id) {

                htmlBody.push('</div>');
                hisId=data[i].id;
                htmlBody.push('<div class="approval-item"><div class="title"><span>历史审批<i class="time">('+data[i].date+')</i></span><hr /><span data-isExpand="0" class="glyphicon glyphicon-plus flex" aria-hidden="true"></span></div>')
                var approval_Header=['<div class="approval-submit-info approval-info"><ul>'];
                approval_Header.push('<li><span class="bt">提交者</span><span class="submit-person approval-text">'+data[i].approvalSubmitUser+'</span>');
                approval_Header.push('<span class="bt">提交时间</span><span class="submit-time approval-text">'+data[i].approvalSubmitUser+'</span></li>');
                approval_Header.push('<li><span class="bt">撤销者</span><span class="repeal-person approval-text">'+data[i].approvalSubmitUser+'</span>');
                approval_Header.push('<span class="bt">撤销时间</span><span class="repeal-time approval-text">'+data[i].approvalSubmitUser+'</span></li>');
                approval_Header.push('<li><span class="bt">审批状态</span><span class="approval-status approval-text">'+data[i].approvalSubmitUser+'</span></li></ul></div>');
                htmlBody.push(approval_Header.join(""));
            }
            //for(var c=0;c<data[i].child.length;c++){
            var approval_item=['<div class="approval-task-info approval-info" ><ul>'];
            approval_item.push('<li><span class="bt">任务日期</span><span class="task-date approval-text">'+data[i].approvalProcessUser+'</span>');
            approval_item.push('<span class="bt">节点名称</span><span class="node-name approval-text">'+data[i].approvalProcessUser+'</span></li>');
            approval_item.push('<li><span class="bt">审批者</span><span class="approval-person approval-text">'+data[i].approvalProcessUser+'</span>');
            approval_item.push('<span class="bt">状态</span><span class="status approval-text">'+data[i].approvalProcessUser+'</span></li>');
            approval_item.push('<li><span class="bt">处理日期</span><span class="dispose-date approval-text">'+data[i].approvalProcessUser+'</span>');
            approval_item.push('<span class="bt">审批结果</span><span class="dispose-result approval-text">'+data[i].approvalProcessUser+'</span></li>');
            approval_item.push('<li><span class="bt">建议及意见</span><span class="suggest approval-text"><button class="btn btn-info btn-xs" onclick=changeTraceClick("'+data[i].id+'","'+data[i].approvalProcessUser+'") >变更痕迹</button></span></li></ul></div>');
            htmlBody.push(approval_item.join(""));
            //}
        }
        htmlBody.push('</div>')

        //审批情况伸缩
        $(document).on('click','.flex',function(){
            if($(this).attr('data-isExpand')==0){
                $(this).parent().parent().css('height','auto');
                $(this).removeClass('glyphicon-plus').addClass('glyphicon-minus').attr('data-isExpand',1);
            }else{
                $(this).parent().parent().css('height','30px');
                $(this).removeClass('glyphicon-minus').addClass('glyphicon-plus').attr('data-isExpand',0);
            }
        })

        return htmlBody.join("");

    }

    //驳回
    function approvalReject(modalobj,tab,info,tp){
        var userInfo=info;
        var psw=modalobj.find('.approval-password').val();
        var opinion=modalobj.find('.approval-opinion').val();
        var userList=[];
        var rows=(tp=='1')?[tab]:tab.bootstrapTable('getSelections');
        for(var i=0;i<rows.length;i++){
            var row={};
            row.id=rows[i].approvalProcessId;
            row.approvalSubmitId=rows[i].approvalId;
            row.approvalProcessOper=3;
            row.approvalProcessTxt=opinion;
            row.approvalProcessPwd=psw;
            userList.push(row);
        }
        tms.services.approvalProcess({
            requestBody:{
                "approvalSubmitId":userInfo.userId,
                "approvalProcessTxt": opinion,
                "approvalProcessPwd":psw,
                "approvalProcessOper":3,
                "tokenType": userInfo.tokenType,
                "refreshToken":userInfo.refreshToken ,
                "userList":userList
            },
            callback:function (data) {
                location.reload();
            }
        })
    }
    //通过
    function approvalPass(modalobj,tab,info,tp){
        var userInfo=info;
        var psw=modalobj.find('.approval-password').val();
        var opinion=modalobj.find('.approval-opinion').val();
        var userList=[];
        var rows=(tp=='1')?[tab]:tab.bootstrapTable('getSelections');
        for(var i=0;i<rows.length;i++){
            var row={};
            row.id=rows[i].approvalProcessId;
            row.approvalSubmitId=rows[i].approvalId;
            row.approvalProcessOper=1;
            row.approvalProcessTxt=opinion;
            row.approvalProcessPwd=psw;
            userList.push(row);
        }
        tms.services.approvalProcess({
            requestBody:{
                "approvalSubmitId":userInfo.userId,
                "approvalProcessTxt": opinion,
                "approvalProcessPwd":psw,
                "approvalProcessOper":1,
                "tokenType": userInfo.tokenType,
                "refreshToken":userInfo.refreshToken ,
                "userList":userList
            },
            callback:function (data) {
                location.reload();
            }
        })
    }
    //提交计划
    function submitPlan(modalobj,tab1,dt,info) {
        var dt=dt;
        var userInfo=info;
        var rows= tab1.bootstrapTable('getSelections');
        var userList=[];
        var approvalWay=modalobj.find('.approval-way').val();
        var isUrgent=modalobj.find('.approval-urgent').prop('checked');
        for(var i=0;i<rows.length;i++){
            var row={};
            row.approvalSubmitUser=userInfo.userName;
            row.approvalProcessUser=rows[i].id;
            row.approvalProcessRole=rows[i].RoleName;
            row.approvalProcessMode=rows[i].Mode;
            userList.push(row);
        }
        tms.services.approvalSubmit({
            requestBody:{
                "approvalSubmitUser": userInfo.userName,
                "userList":userList,
                "referencedType": "workperiodsheet",
                "referencedId": dt.planVersionId,
                "approvalSubmitType": approvalWay
            },
            callback:function (data) {
                location.reload();
            }
        })
    }
    //继续提交计划
    function submitPlanNext(modalobj,tab1,tab2,info) {
        var userInfo=info;
        var rows=tab1.bootstrapTable('getSelections');
        var rows2=[tab2];
        var userList=[];
        var approvalWay=$('.approval-way').val();
        var isUrgent=$('.approval-urgent').prop('checked');
        var psw=modalobj.find('.approval-password').val();
        var opinion=modalobj.find('.approval-opinion').val();
        for(var i=0;i<rows.length;i++){
            var row={};
            row.approvalSubmitUser=userInfo.userName;
            row.approvalProcessUser=rows[i].id;
            row.approvalProcessRole=rows[i].RoleName;
            row.approvalProcessMode=rows[i].Mode;
            for(var j=0;j<rows2.length;j++){
                row.id=rows2[j].approvalProcessId;
                row.approvalSubmitId=rows2[j].approvalId;
                userList.push(row);
            }
        }
        tms.services.approvalProcess({
            requestBody:{
                "approvalSubmitId":rows2[0].approvalId,
                "approvalProcessTxt": opinion,
                "approvalProcessPwd":psw,
                "approvalProcessOper":2,
                "tokenType": userInfo.tokenType,
                "refreshToken":userInfo.refreshToken ,
                "userList":userList,
            },
            callback:function (data) {
                location.reload();
            }
        })
    }

    // By snowden.xu
    // 格式化字符串日期
    function formatDate(date){
        return (date.substring(0,4) + '.' + date.substring(4,6) + '.' + date.substring(6,8));
    }

}).call(tms, jQuery);

