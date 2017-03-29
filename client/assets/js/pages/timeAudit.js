/**
 * Created by snowden.xu on 2017/3/15.
 */
var $table = $('#table');
var userInfo=tms.getLocalStorage("userInfo",true);
var selectContent,                // 选中的列表值
    origUserList = [];            // 人员列表

// 查看意见
window.actionEvents={
    'click .view':function(e, value, row, index){
        e.stopPropagation();
        $("#myModal3").modal('show');
    }
};

// 加载审批情况
$(document).on('click','[data-action]',function () {
    var status = $(this).attr("data-action");
    var parents = $(this).parents('.modal');
    var approvalProcessTxt = parents.find('.approvalProcessTxt').val();
    var approvalProcessPwd = parents.find('.approvalProcessPwd').val();
    var param = {
        approvalProcessTxt:approvalProcessTxt,
        approvalProcessPwd:approvalProcessPwd,
        status:status
    };
    isPass(param);
});

$(function(){
    //初始化表格
    $table.bootstrapTable({
        data:[],                               // 初始化表格数据
        clickToSelect: true,                   // 是否启用点击选中行
        striped: true,                         // 是否显示行间隔色
        pagination: true,                      // 是否显示分页（*）
        pageSize: 20,                          // 每页的记录行数（*）
        height: getHeight(),                   // 自适应窗口高度
        pageList:[10, 20, 50, 100]             // 分页显示条数
    });

    // 加载人员列表
    loadPersonList(function(){
        // 加载人员下拉列表
        $('#approvaluserid').select2({
            data:origUserList
        });
        // 加载列表
        list()
    });

    // 搜索
    $('.search').click(function(){
        list();
    });

    // 审批情况模态框加载后加载历史审批等记录
    $('#myModal3').on('show.bs.modal',function () {
        tms.services.approvalProcessList({
            requestBody:{
                "referencedType": "workperiodsheet",
                "referencedId": 1
            },
            callback:function (data) {
                var htmls=tms.util.historyApproval(data.userList);
                $(".approval-list").html(htmls);
            }
        })
    });

    // 通过审核事件
    $('#passAuditBtn').click(function(){
        // 获取选中行数据
        selectContent = $table.bootstrapTable('getSelections');
        // 如果数据为空显示'选择一条数据'否则加载通过审核模块框
        if(selectContent.length) {
            //console.log(selectContent);
            $('#passAudit').modal({
                show:true,
                backdrop:'static'   // 空白处禁止关闭弹出层
            });
        }else{
            tms.alert('请选择至少一条未审核的记录');
        }
    });

    // 驳回事件
    $('#rejectBtn').click(function(){
        // 获取选中行数据
        selectContent = $table.bootstrapTable('getSelections');
        // 如果数据为空显示'选择一条数据'否则加载通过审核模块框
        if(selectContent.length) {
            //console.log(selectContent);
            $('#reject').modal({
                backdrop:'static'   // 空白处禁止关闭弹出层
            });
        }else{
            tms.alert('请选择至少一条未审核的记录');
        }
    });

    // 日期初始化
    DatePicker("#beginDate","#endDate");

    // 对浏览器窗口调整大小进行计数并重置表格宽度和高度
    $(window).resize(function () {
        $table.bootstrapTable( 'resetView', {
            height: getHeight()
        });
    });

    // 指定的200毫秒数后并重置宽度和高度
    setTimeout(function () {
        $table.bootstrapTable('resetView');
    }, 200);
});

// 获取人员列表
function loadPersonList(callback){
    tms.services.origUserList({
        requestBody:{
            tokenType:userInfo.tokenType,
            refreshToken:userInfo.refreshToken
        },
        callback: function(res){
            $.each(res["origUserDetailList"], function (i, item) {
                origUserList.push({
                    id: item["Id"],
                    text: item["Name"]
                });
            });
            if(callback) callback();
        }
    });
}

// 获取审核列表
function list(){
    // 清除表格
    $table.bootstrapTable("removeAll");
    // 获取审批状态
    var approveSubmitStatus = $("#approveSubmitStatus").val();
    // 提交者人员id
    var approvaluserid = $("#approvaluserid").val();
    // 获取开始时间
    var beginDate = $("#beginDate").val();
    // 获取结束时间
    var endDate = $("#endDate").val();
    console.log(approvaluserid);
    tms.services.workPeriodApprovalList({
        requestBody:{
            approveSubmitStatus: approveSubmitStatus,   // 审批状态
            approvaluserid: approvaluserid,             // 提交者人员id
            beginDate: beginDate,                       // 时间段-开始
            endDate: endDate                            // 时间段-结束
        },
        callback: function(res) {
            console.log(res);
            //格式化数据
            var i, data = [];
            for(i = 0; i < res.length; i++){
                for(var j = 0; j < origUserList.length; j++){
                    if(res[i]['approvalUserId'] == origUserList[j]['id']){
                        var approvalUser = origUserList[j]['text'];
                    }
                }
                data.push({
                    // 提交人ID
                    approvalUserId:res[i]['approvalUserId'],
                    // 提交人姓名
                    approvalUser:approvalUser,
                    // 不清楚是什么id
                    tenantId:res[i]['tenantId'],
                    // 查看明细id
                    workPeriodSheetId:res[i]['workPeriodSheetId'],
                    // 查看人ID
                    userId:res[i]['userId'],
                    // 周期开始时间
                    workPeriodFromDate:res[i]['workPeriodFromDate'],
                    // 周期结束时间
                    workPeriodToDate:res[i]['workPeriodToDate'],
                    // 周期拼好
                    workPeriodDate:res[i]['workPeriodFromDate'] + " ~ " + res[i]['workPeriodToDate'],
                    // 工时
                    workPeriodWorkhours:res[i]['workPeriodWorkhours'],
                    approvalSubmitStatus:status(res[i]['approvalSubmitStatus']),
                    approvalSubmitDate:res[i]['approvalSubmitDate'],
                    approvalFinishTime:res[i]['approvalFinishTime']
                })
            }
            //初始化表格并赋值
            $table.bootstrapTable('load',data);
        }
    });
}

// 审批通过/上级继续审批/驳回
function isPass(options){
    if(!options.approvalProcessPwd){
        tms.alert('请输入您的登录密码');
        return false;
    }else {
        tms.services.approvalProcess({
            requestBody:{
                "id": selectContent['approvalUserId'],
                "approvalSubmitId": selectContent['userId'],
                "approvalProcessTxt": options.approvalProcessTxt,
                "approvalProcessPwd": options.approvalProcessPwd,
                "approvalProcessOper": options.status,
                "tokenType": userInfo.tokenType,
                "refreshToken": userInfo.refreshToken,
                "userList": selectContent
            },
            callback:function(res){
                tms.alert('操作成功');
                $('#passAudit').modal('hide');
                $('#reject').modal('hide');
                // 清除表单数据
                $('.approvalProcessTxt').val('');
                $('.approvalProcessPwd').val('');
            }
        })
    }
}

// 查看意见
function actionFormatter(value, row, index) {
    return "<a class='view' href='javascript:void(0)' data-toggle='modal' data-target='#myModal3'>查看意见</a>";
}

// 审批状态
function status(status){
    switch (status){
        case '1':
            status = '审核中';
            break;
        case '2':
            status = '驳回';
            break;
        case '3':
            status = '通过';
            break;
    }
    return status;
}

// 周期
function dateFormatter(value,row,index){
    return "<a href='/timeAudit/detail?workPeriodFromDate="+row.workPeriodFromDate+"" +
        "&workPeriodToDate="+ row.workPeriodToDate+"" +
        "&approvalSubmitDate="+ row.approvalSubmitDate+"" +
        "&workPeriodSheetId="+ row.workPeriodSheetId+"" +
        "&approvalUser="+ row.approvalUser+"" +
        "&workPeriodWorkhours="+ row.workPeriodWorkhours +" ' target='_self' title='"+row.workPeriodDate+"'>"+value+"</a>";
}

// 时间段
function DatePicker(beginSelector,endSelector){
    // 仅选择日期
    $(beginSelector).datetimepicker(
        {
            format: 'yyyy-mm-dd',        // 显示格式
            minView:2,
            language:"zh-CN",            // 显示中文
            autoclose:true,              // 选中自动关闭
            todayBtn: true,               // 显示今日按钮
            endDate:new Date()
        }).on('changeDate', function(ev){
        if(ev.date){
            $(endSelector).datetimepicker('setStartDate', new Date(ev.date.valueOf()))
        }else{
            $(endSelector).datetimepicker('setStartDate',null);
        }
    });

    $(endSelector).datetimepicker(
        {
            format: 'yyyy-mm-dd',        // 显示格式
            minView:2,
            language:"zh-CN",            // 显示中文
            autoclose:true,              // 选中自动关闭
            todayBtn: true,               // 显示今日按钮
            endDate:new Date()
        }).on('changeDate', function(ev){
        if(ev.date){
            $(beginSelector).datetimepicker('setEndDate', new Date(ev.date.valueOf()))
        }else{
            $(beginSelector).datetimepicker('setEndDate',new Date());
        }

    })
}

// 获取浏览器高度
function getHeight() {
    return $(window).height() - $('.contral').outerHeight(true) - 100;
}