var planApproval=$("#planApproval");
var userInfo=null;
var roleUserList=[];
$(function () {
    $('.search1').select2();
    $('.search2').select2();
    userInfo=tms.getLocalStorage('userInfo',true);
    tms.services.planVersionApprovalList({
        requestBody:{
            "pageIndex": 1,
            "pageSize": 20
        },
        callback:function (data) {
            planApproval.bootstrapTable('load',data.planBriefApprovalList);
        }
    })
    planApproval.bootstrapTable();
    //角色列表
    tms.services.authorityRoleList({
        callback:function (data1) {
            var options=[];
            var roles=data1.authorityList;
            for(var i=0;i<roles.length;i++){
                options.push("<option value='"+roles[i].id+"'>"+roles[i].roleName+"</option>");
            }
            $('#role').html(options.join(''));
            tms.services.origUserList({
                requestBody:{
                    "tokenType": userInfo.tokenType,
                    "refreshToken":userInfo.refreshToken
                },
                callback:function (data2) {
                    var rows=[];
                    var userlist=data2.origUserDetailList;
                    for(var i=0;i<userlist.length;i++){
                        var row={};
                        var userid=userlist[i].Id;
                        var roleName=eachRole(userid,roles);
                        row.id=userid;
                        row.UserName=userlist[i].Username;
                        row.RoleName=roleName;
                        row.Mode='1';
                        rows.push(row);
                    }
                    roleUserList=rows;
                }
            })
        }
    })
    //提交计划
    $("#myModal").on('shown.bs.modal',function () {
        $('#submitPlan').bootstrapTable('load',roleUserList);
    })
    //提交计划
    $('#submitPlan').bootstrapTable();
    //驳回
    $('.approval-reject').click(function () {
        tms.util.approvalReject($('#myModal7'),planTask);
    })
    //通过
    $('.approval-pass').click(function () {
        tms.util.approvalPass($('#myModal8'),planTask);
    })
})
//用户查询自己所在角色
function eachRole(uid,data) {
    var userid=uid;
    var roles=data;
    var isRole=false;
    for(var j=0;j<roles.length;j++){
        var roleUserList=roles[j].authorityRoleUserList;
        for(var n=0;n<roleUserList.length;n++){
            if(userid==roleUserList[n].userId) {
                isRole=true;
                break;
            }
        }
        if(isRole){
            return roles[j].roleName;
        }
    }
    return "";
}
function nameFormatter(val,row,index) {
    return "<a href='/planApproval/planTask?id="+row.planVersionProjectId+"&planName="+val+"&versionName="+row.planVersionVersionName+"&submitTime="+row.approvalCreateTime+"&managerName="+row.planVersionManageName+"&approvalId="+row.approvalId+"&planVersionId="+row.refId+"&approvalProcessId="+row.approvalProcessId+"' >"+val+"</a>";
}
function actionFormatter(val,row,index) {
    return "<a class='lookIdea' href='javascript:void(0)' >查看意见</a>";
}
function statusFormatter(val,row,index) {
    switch(val){
        case "1":
            return "已通过";
            break;
        case "2":
            return "审核中";
            break;
        case "3":
            return "拒绝";
            break;
    }
}
window.actionEvents={
    'click .lookIdea':function (e, value, row, index) {
        $("#myModal3").modal('show');
        tms.services.approvalProcessList({
            requestBody:{
                "referencedType": "planversion",
                "referencedId": row.approvalId,
            },
            callback:function (data) {
                var htmls=tms.util.historyApproval(data.userList);
                $(".approval-list").html(htmls);
            }
        })
    }
}
//计划搜索
function searchPlan(){
    var projectId=$('.search2').val();
    var processmode=$('.search1').val();
    tms.services.planVersionApprovalList({
        requestBody:{
            "approvalProcessStatus": processmode,
            "projectId":projectId,
            "pageIndex": 1,
            "pageSize": 20
        },
        callback:function (data) {
            planApproval.bootstrapTable('load',data.planBriefApprovalList);
        }
    })
}
//驳回
function approvalReject(){
    var psw=$('#myModal7').find('.approval-password').val();
    var opinion=$('#myModal7').find('.approval-opinion').val();
    var userList=[];
    var rows=planApproval.bootstrapTable('getSelections');
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
function approvalPass(){
    var psw=$('#myModal8').find('.approval-password').val();
    var opinion=$('#myModal8').find('.approval-opinion').val();
    var userList=[];
    var rows=planApproval.bootstrapTable('getSelections');
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
//上级继续审核
function approvalNext(){
    $('#myModal').modal('show');

    var psw=$('#myModal7').find('.approval-password').val();
    var opinion=$('#myModal7').find('.approval-opinion').val();
    var userList=[];
    var rows=planApproval.bootstrapTable('getSelections');
    for(var i=0;i<rows.length;i++){
        var row={};
        row.id=rows[i].approvalProcessId;
        row.approvalSubmitId=rows[i].approvalId;
        row.approvalSubmitUser=3;
        row.approvalProcessUser=opinion;
        row.approvalProcessRole=psw;
        row.approvalProcessMode="";
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
//提交计划
function submitPlan() {
    var rows=$('#submitPlan').bootstrapTable('getSelections');
    var rows2=planApproval.bootstrapTable('getSelections');
    var userList=[];
    var approvalWay=$('.approval-way').val();
    var isUrgent=$('.approval-urgent').prop('checked');
    var psw=$('#myModal8').find('.approval-password').val();
    var opinion=$('#myModal8').find('.approval-opinion').val();
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