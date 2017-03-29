var planTask=$("#planTask");
var projectId=null;
var planVersionId=null;
var approvalId=null;
var userInfo=null;
var oldIds=[];
var approvalProcessId=null;
var approval={};
$(function () {
    planTask.bootstrapTable({
        uniqueId:'id',
        treeShowField:'taskConfigCode',
    });
    approval.projectId=tms.util.getUrlParam("id");
    approval.planVersionId=tms.util.getUrlParam('planVersionId');
    approval.approvalId=tms.util.getUrlParam('approvalId');
    approval.approvalProcessId=tms.util.getUrlParam('approvalProcessId');
    var submitPlan=$('#submitPlan').bootstrapTable();
    $("#myModal").on('show.bs.modal',function () {
        var tp=$(this).val();
        if(tp=='驳回'){
            $('#myModalLabel').find('.type-name').html(tp);
        }
    })
    userInfo=tms.getLocalStorage('userInfo',true);
    //列表
    tms.services.planTaskList({
        requestBody:{
            projectId:approval.projectId,
            planVersionId:approval.planVersionId,
        },
        callback:function (data) {
            var datas=data.planTasks;
            planTask.bootstrapTable('load',datas);
            for(var i=0;i<datas.length;i++){
                if(datas[i].pid!=0&&datas[i].pid) planTask.bootstrapTable("hideRow",{uniqueId:datas[i].id});
            }
            //记录页面上的任务项ID；
            for(var i=0;i<datas.length;i++){
                var item=datas[i];
                oldIds.push(item.taskConfigCode);
            }
        }
    })
    //任务
    tms.services.taskConfigList({
        callback:function (data) {
            var datas=data.taskConfigList;
            var testArr=[];
            for(var i=0;i<datas.length;i++){
                if(datas[i].lev===undefined){
                    datas[i].lev=0;
                    testArr.push(datas[i]);
                    eachJson(datas[i],datas,testArr);
                }
            }
            var options=['<option value="0">请选择任务</option>'];
            for(var i=0;i<testArr.length;i++){
                var hold=[];
                var len=parseInt(testArr[i].lev);
                var isdis=isDisabled(testArr[i].taskConfigCode)?"disabled='disabled'":"";
                for(var j=0;j<=len;j++){
                    hold.push("　")
                }
                options.push("<option value='"+testArr[i].taskConfigCode+"' "+isdis+" >"+hold.join("")+testArr[i].taskConfigName+"</option>");
            }
            $('#task-type').html(options.join(""));
        }
    })
    //角色
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
                        row.Mode='2';
                        rows.push(row);
                    }
                    roleUserList=rows;
                    submitPlan.bootstrapTable('load',roleUserList);
                }
            })
        }
    })
    //审批情况
    $("#myModal3").on('show.bs.modal',function () {
        tms.services.approvalProcessList({
            requestBody:{
                "referencedType": "workperiodsheet",
                "referencedId": 1,
            },
            callback:function (data) {
                var htmls=tms.util.historyApproval(data.userList);
                $(".approval-list").html(htmls);
            }
        })
    })
    //行展开.收缩
    $("body").on('click','.isParent',function (e) {
        var e=e||event;
        e.stopPropagation();
        var uid=$(this).attr("data-uid");
        var rows= planTask.bootstrapTable("getRow",{name:'pid',val:uid});
        var nowRow=planTask.bootstrapTable("getRow",{name:'id',val:uid})[0];
        var isexp=nowRow.isExpand;
        if(!isexp||isexp=="off"){
            nowRow.isExpand='on';
            for(var i=0;i<rows.length;i++){
                planTask.bootstrapTable("showRow",{uniqueId:rows[i].id});
            }
        }else{
            nowRow.isExpand='off';
            for(var i=0;i<rows.length;i++){
                if(rows[i].nid) eachHideRow(rows[i]);
                rows[i].isExpand='off';
                planTask.bootstrapTable("hideRow",{uniqueId:rows[i].id});
            }
        }
    })
    //驳回
    $('.approval-reject').click(function () {
        tms.util.approvalReject($('#myModal7'),approval,userInfo,"1");
    })
    //通过
    $('.approval-pass').click(function () {
        tms.util.approvalPass($('#myModal8'),approval,userInfo,"1");
    })
    //继续提交计划
    $('.approval-pass-next').click(function () {
        tms.util.submitPlanNext($('#myModal8'),submitPlan,approval,userInfo);
    })
})
//是否禁用
function isDisabled(id){
    for(var i=0;i<oldIds.length;i++){
        if(id==oldIds[i]) return true;
    }
    return false;
}
//遍历行子集z
function eachHideRow(row){
    var rows= planTask.bootstrapTable("getRow",{name:'pid',val:row.id});
    for(var i=0;i<rows.length;i++){
        if(rows[i].nid) eachHideRow(rows[i]);
        rows[i].isExpand='off';
        planTask.bootstrapTable("hideRow",{uniqueId:rows[i].id});
    }
    return false;
}
//处理任务层级
function eachJson(item,data,newData){
    for(var i=0;i<data.length;i++){
        if(item.id==data[i].pid){
            var node=data[i];
            node.lev=parseInt(item.lev)+1;
            newData.push(data[i]);
            if(node.nid) eachJson(node,data,newData);
        }
    }
    return false;
}
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
//行操作
function actionFormatter(val,row){
    return[
        '<a class="edit ml10" href="javascript:void(0)" title="Edit">',
        '<i class="glyphicon glyphicon-edit"></i>',
        '</a>',
        '<a class="remove ml10" href="javascript:void(0)" title="Remove">',
        '<i class="glyphicon glyphicon-remove"></i>',
        '</a>'
    ].join("");
}
//行操作事件
window.actionEvents={
    'click .edit':function(e, value, row, index){
        e.stopPropagation();
        $("#myModal2").modal('show');
        $("#myModal2").find('.taskItem1').hide();
        $("#myModal2").find('.taskItem2').hide();
        $("#myModal2").find('.taskSave').prop('onclick',planTaskEdit(row.id))
    },
    'click .remove':function(e, value, row, index){
        e.stopPropagation();
        if(!row.nid) alert('有子集无法删除！');
        tms.services.planTaskDel({
            requestBody:{
                id:row.id
            },
            callback:function () {
                projectTable.bootstrapTable('removeByUniqueId',row.id);
            }
        });
    },
}
//是否有子集
function nameFormatter(val,row,ind) {
    if(row.nid){
        return "<span class='isParent'  data-uid='"+row.id+"'><i class='icon "+(row.isExpand=="on"?"icon-expand":"") +"'></i>"+val+"</span>";
    }
    return "<span class='isParent'  data-uid='"+row.id+"'><i class='iconHolder'></i>"+val+"</span>";
}
//编辑任务
function planTaskEdit(id) {
    var taskid=id;
    var unit=$('#unit').val();
    var role=$('#role').val();
    var numberpeople=$('#number-people').val();
    var expectedtime=$('#expected-time').val();
    tms.services.planTaskUpd({
        requestBody:{
            "id": taskid,
            "projectId":approval.projectId ,
            "planVersionId": approval.planVersionId,
            "taskConfigCode":"",
            "taskConfigName":"",
            "unit": unit,
            "functionTeamCode": 1,
            "functionTeamName": "CRA",
            "numberOfPeople": numberpeople,
            "workHour": expectedtime
        }
    })
}
//新增任务
function planTaskAdd(){
    var taskCode=$('#task-type').val();
    var taskName=$("#task-type").find("option:selected").text();
    var unit=$('#unit').val();
    var role=$('#role').val();
    var roleName=$("#role").find("option:selected").text();
    var numberpeople=$('#number-people').val();
    var expectedtime=$('#expected-time').val();
    tms.services.planTaskAdd({
        requestBody:{
            "projectId": approval.projectId,
            "planVersionId":approval.planVersionId,
            "planBriefId": approval.planBriefId,
            "taskConfigCode":taskCode ,
            "taskConfigName":taskName,
            "unit": unit,
            "functionTeamCode": role,
            "functionTeamName": roleName,
            "numberOfPeople": numberpeople,
            "workHour":expectedtime
        },
        callback:function (data) {
            location.reload();
        }
    })
}
//编辑计划
function planVersionUp() {
    var planName=$('#myModal5').find('.plan-name').val();
    var principal=$('#myModal5').find('.principal').val();
    tms.services.planVersionUpdate({
        requestBody:{
            "id": approval.projectId,                                                                     // planVersion的id
            "planName": planName,
            "manager": principal
        },
        callback:function (data) {
            location.reload();
        }
    })
}