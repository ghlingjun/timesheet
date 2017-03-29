/**
 * Created by hao.yu on 2017/3/9.
 */
var projectTable=$("#projectList");
var roleUserList=[];
var projectId=null;
var oldIds=[];
var userInfo = tms.getLocalStorage("userInfo",true);
var planVersionId=null;
var planBriefId=null;
$(function () {
    var userInfo=tms.getLocalStorage("userInfo",true);
    var softwareCode=userInfo.softwareCode;
    var accessToken=userInfo.accessToken;
    var tokenType=userInfo.tokenType;
    projectId=tms.util.getUrlParam("id");
    planVersionId=$('.hisVersion.active').attr('value');
    planBriefId=$('.hisVersion.active').attr('data-id');
    $('.selectProject').select2();
    $('#task-type').select2();

    $('#task-type').on('select2:select',function (e) {
       var params= e.params;
       var text=params.data.text;
       var newtext=text.replace(/(^\s+)|(\s+$)/g,"");
        $('#select2-task-type-container').html(newtext).attr('title',newtext);
    })
    // tms.services
    //历史版本
    $('body').on('click','.hisVersion',function () {
        $('.hisVersion').removeClass('active');
        $(this).addClass('active');
        planVersionId=$(this).attr('data-id');
        tms.services.planTaskList({
            requestBody:{
                projectId:projectId,
                planBriefId:planBriefId
            },
            callback:function (data) {
                projectTable.bootstrapTable('load',data.planTasks);
                //记录页面上的任务项ID；
                for(var i=0;i<data.planTasks.length;i++){
                    var item=data.planTasks[i];
                    oldIds.push(item.taskConfigCode);
                }
            }
        })
    })
    projectTable.bootstrapTable({
        uniqueId:'id',
        treeShowField:'taskConfigCode'
    });
    if(planVersionId){
        tms.services.planTaskList ({
            requestBody:{
                projectId:projectId,
                planVersionId:planVersionId,
            },
            callback:function (data) {
                var datas=data.planTasks;
                projectTable.bootstrapTable('load',datas);
                for(var i=0;i<datas.length;i++){
                    if(datas[i].pid!=0&&datas[i].pid) projectTable.bootstrapTable("hideRow",{uniqueId:datas[i].id});
                }
                //记录页面上的任务项ID；
                for(var i=0;i<datas.length;i++){
                    var item=datas[i];
                    oldIds.push(item.taskConfigCode);
                }
            }
        })
    }
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
    //行展开.收缩
    $("body").on('click','.isParent',function (e) {
        var e=e||event;
        e.stopPropagation();
        var uid=$(this).attr("data-uid");
        var rows= projectTable.bootstrapTable("getRow",{name:'pid',val:uid});
        var nowRow=projectTable.bootstrapTable("getRow",{name:'id',val:uid})[0];
        var isexp=nowRow.isExpand;
        if(!isexp||isexp=="off"){
            nowRow.isExpand='on';
            for(var i=0;i<rows.length;i++){
                projectTable.bootstrapTable("showRow",{uniqueId:rows[i].id});
            }
        }else{
            nowRow.isExpand='off';
            for(var i=0;i<rows.length;i++){
                if(rows[i].nid) eachHideRow(rows[i]);
                rows[i].isExpand='off';
                projectTable.bootstrapTable("hideRow",{uniqueId:rows[i].id});
            }
        }
    })
    //审批情况
    $("#myModal3").on('show.bs.modal',function () {
        tms.services.approvalProcessList({
            requestBody:{
                "referencedType": 'planversion',
                "referencedId": planVersionId,
            },
            callback:function (data) {
                var htmls=tms.util.historyApproval(data.userList);
                $(".approval-list").html(htmls);
            }
        })
    })
    //提交计划
    $("#myModal").on('shown.bs.modal',function () {
        $('#submitPlan').bootstrapTable('load',roleUserList);
    })
    //提交计划
    $('#submitPlan').bootstrapTable();
    //选择任务获取编号
    $('#task-type').change(function () {
        $('#number').val($(this).val());
    })
    //更新版本
    $('#updateVersion').click(function () {
        tms.confirm('您真的要更新版本吗？',function () {
            tms.services.planVersionCreate({
                requestBody:{
                    projectId:projectId
                }
            })
        })
    })
    $('.taskSave').click(function () {
        var tid=$(this).attr('data-id');
        planTaskEdit(tid);
    })
})
//遍历行子集z
function eachHideRow(row){
    var rows= projectTable.bootstrapTable("getRow",{name:'pid',val:row.id});
    for(var i=0;i<rows.length;i++){
        if(rows[i].nid) eachHideRow(rows[i]);
        rows[i].isExpand='off';
        projectTable.bootstrapTable("hideRow",{uniqueId:rows[i].id});
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
//是否禁用
function isDisabled(id){
    for(var i=0;i<oldIds.length;i++){
        if(id==oldIds[i]) return true;
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
//是否有子集
function nameFormatter(val,row,ind) {
    if(row.nid){
        return "<span class='isParent'  data-uid='"+row.id+"'><i class='icon "+(row.isExpand=="on"?"icon-expand":"") +"'></i>"+val+"</span>";
    }
    return "<span class='isParent'  data-uid='"+row.id+"'><i class='iconHolder'></i>"+val+"</span>";
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

        $('#unit').val(row.unit);
        $('#role').val(row.unit);
        $('#number-people').val(row.numberOfPeople);
        $('#expected-time').val(row.workHour);

        $("#myModal2").find('.taskSave').attr('data-id',row.id);
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
//计划方式选择
window.selectEvent={
    'click .selectWay':function (e, value, row, index) {
        e.stopPropagation();
    },
    'change .selectWay':function (e, value, row, index) {
        e.stopPropagation();
        row.Mode= $(this).val();
    }
}
//项目选择
function selectOnchang(val){
    projectId=val;
    tms.services.planTaskList({
        requestBody:{
            projectId:projectId,
            planVersionId:"",
        },
        callback:function (data) {
            projectTable.bootstrapTable('load',data);
        }
    })
    tms.services.planBriefQuery({
        requestBody:{
            projectId:projectId,
        },
        callback:function (data) {
            var as=[];
            for(var i=0;i<data.length;i++){
                var ac= i==0?"active":"";
                as.push("<span class='hisVersion "+ac+"' value='"+data[i].planVersionId+"'>"+data[i].versionSn+"</span>");
            };
            $("#versionList").html(as.join(""));
        }
    })
}
//提交计划
function submitPlan() {
var rows= $('#submitPlan').bootstrapTable('getSelections');
var userList=[];
var approvalWay=$('.approval-way').val();
var isUrgent=$('.approval-urgent').prop('checked');
for(var i=0;i<rows.length;i++){
    var row={};
    row.approvalSubmitUser=userInfo.userName;
    row.approvalProcessUser=rows[i].id;
    row.approvalProcessRole=rows[i].RoleName
    row.approvalProcessMode=rows[i].Mode;
    userList.push(row);
}
    tms.services.approvalSubmit({
        requestBody:{
            "approvalSubmitUser": userInfo.userName,
            "userList":userList,
            "referencedType": "workperiodsheet",
            "referencedId": planVersionId,
            "approvalSubmitType": approvalWay
        },
        callback:function (data) {
            location.reload();
        }
    })
}
//编辑计划--保存
function saveEditPlan(){
    var planName=$('.plan-name').val();
    var principal=$('.principal').val();
    if(!versionId) versionId=$('.hisVersion.active').val();
    tms.services.planVersionUpdate({
        requestBody:{
            id:versionId,
            planName:planName,
            manager:principal,
        }
    })

}
//方式格式化
function wayFormatter(){
    var select=['<select class="selectWay">'];
    select.push('<option value="0">主审</option>');
    select.push('<option value="1">知会</option>');
    select.push('</select>')
    return select.join('');
}
//编辑任务
function planTaskEdit(id) {
    var projectId="",planBriefId="",planVersionId="";
    var taskid=id;
    var unit=$('#unit').val();
    var role=$('#role').val();
    var numberpeople=$('#number-people').val();
    var expectedtime=$('#expected-time').val();
    tms.services.planTaskUpd({
        requestBody:{
            "id": taskid,
            "projectId":projectId ,
            "planVersionId": planVersionId,
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
            "projectId": projectId,
            "planVersionId":planVersionId,
            "planBriefId": planBriefId,
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
