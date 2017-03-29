// Created by cde.chen on 17-3-22.


var $table = $('#table');
var userInfo=tms.getLocalStorage("userInfo",true);
var projectNameList = [],      // 项目名称
    projectNumList = [],       // 项目编号
    projectQueryList = [],     // 当前系统下的所有项目信息
    newData =[],               // 编辑后存放的新数据
    taskList = [],             // 任务列表
    roleUserList = [];         // 角色列表
var getall;                    // 周期长度

// 计划方式选择
window.selectEvent={
    'click .selectWay':function (e, value, row, index) {
        e.stopPropagation();
    },
    'change .selectWay':function (e, value, row, index) {
        e.stopPropagation();
        row.Mode= $(this).val();
    }
};

$(function () {
    navActive('timeFill')
    // 加载项目列表
    loadPorjectList(function(){
        // 加载任务列表
        loadTaskList();
        // 加载项目明细列表
        list();
    });
    // 获取Id
    var workPeriodSheetId = tms.util.getUrlParam('workPeriodSheetId');
    $('.approval-pass-next').click(function () {
        tms.util.submitPlan($('#myModal'),$('#submitPlan'),{planVersionId:workPeriodSheetId},userInfo);
    })
    // 新增行
    $('#addBtn').click(function(){
        $table.bootstrapTable('load', newData);
        var arr = new Array(getall.length);
        var tableId = $table.bootstrapTable('getData').length;
        $table.bootstrapTable('insertRow', {
            index: 0,
            row: {
                id:tableId+1,
                projectId:projectNumList[0]['projectId'],
                projectNum:projectNameList[0]['value'],
                projectName:projectNameList[0]['text'],
                taskConfigId:taskList[0]['value'],
                taskConfigName:taskList[0]['text'].replace(/(^\s*)|(\s*$)/g,''),
                taskConfigCharge:true,
                taskIs:"是",
                taskPosition:"经理",
                taskArea:"上海",
                taskHours:arr
            }
        });
        editer();
    });

    // 删除任务事件
    $('#deleteBtn').click(function () {
        tms.confirm('您确定删除本条任务？',function () {
            var ids = getIdSelections();
            $table.bootstrapTable('remove',{
                field: 'id',
                values: ids
            });
            editer();
            $('#deleteBtn').prop('disabled', true);
        });
    });

    // 编辑按钮事件
    $('#editBtn').click(function(){
        $('.contral').hide();
        $('.contralTwo').show();
        editer();
    });

    // 取消按钮事件
    $('#cancelBtn').click(function(){
        $('.contral').show();
        $('.contralTwo').hide();

        location.reload();
    });

    // 保存
    $('#save').click(function(){
        var dd = $table.bootstrapTable('getData');
        var data = JSON.stringify(dd);
        data = JSON.parse(data.replace(/:undefined/g, ":\"\""));
        console.log(data);

        var workPeriodSheetId = tms.util.getUrlParam('workPeriodSheetId');
        var workPeriodSheetRows = [];
        for(var i = 0; i < data.length; i++){
            workPeriodSheetRows.push({
                projectId:data[i]['projectId'],
                taskConfigCharge: data[i]['taskConfigCharge'],
                taskConfigId:data[i]['taskConfigId'],
                taskConfigName:data[i]['taskConfigName'],
                taskHours:data[i]['taskHours'],
                taskArea:data[i]['taskArea'],
                taskPosition:data[i]['taskPosition']
            })
        }
        tms.services.workPeriodSheetItemSave({
            requestBody:{
                id:workPeriodSheetId,
                workPeriodSheetRows:workPeriodSheetRows
            },
            callback:function (res) {
                tms.alert('保存成功');
                setTimeout(function(){
                    location.reload();
                },2000);
            }
        })
    });

    // 返回列表
    $('#backList').click(function () {
        location.href = '/timeFill';
    });

    // 列表勾选后触发
    $table.on('check.bs.table uncheck.bs.table ' +
        'check-all.bs.table uncheck-all.bs.table', function () {
        $('#modifyBtn').prop('disabled', !$table.bootstrapTable('getSelections').length);
        $('#deleteBtn').prop('disabled', !$table.bootstrapTable('getSelections').length);
        selections = getIdSelections();
    });

    /* 提交通用 */
    {
        // 提交
        loadRoleList(function(){

            // //选择任务获取编号
            // $('#task-type').change(function () {
            //     $('#number').val($(this).val());
            // });
        });

        // 审批情况模态框加载后加载历史审批等记录
        $('#myModal3').on('show.bs.modal',function () {
            tms.services.approvalProcessList({
                requestBody:{
                    "referencedType": "workperiodsheet",
                    "referencedId": workPeriodSheetId
                },
                callback:function (data) {
                    console.log(data)
                    var htmls=tms.util.historyApproval(data.userList);
                    $(".approval-list").html(htmls);
                }
            })
        });
    }

    //对浏览器窗口调整大小进行计数并重置表格宽度和高度
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

// 获取角色列表
function loadRoleList(callback){
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
                    $('#submitPlan').bootstrapTable({
                        data:roleUserList
                    });
                }
            })
        }
    })
}

// 获取任务列表
function loadTaskList(){
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
            for(var i=0;i<testArr.length;i++){
                var hold=[];
                var len=parseInt(testArr[i].lev);
                for(var j=0;j<=len;j++){
                    hold.push(" ")
                }
                taskList.push({
                    value:testArr[i].id,
                    text:hold.join('')+testArr[i].taskConfigName
                });
            }
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
            function getChild(item,nodes) {
                var level=item.lev+1;
                for (var i=0;i<nodes.length;i++){
                    nodes[i].lev=level;
                    eachJson(nodes[i].pid);
                }
                return false;
            }
        }
    });
}

// 获取项目列表
function loadPorjectList(callback){

    tms.services.projectQuery({
        requestBody:{
            softwareCode:userInfo.softwareCode,
            accessToken:userInfo.accessToken,
            tokenType:userInfo.tokenType
        },
        callback:function (res) {
            projectQueryList = res['projects'];
            //console.log(projectQueryList);
            for(var i = 0; i < projectQueryList.length; i++){
                // 项目名称
                projectNameList.push({
                    value:projectQueryList[i].projectNum,
                    projectId:projectQueryList[i].projectId,
                    text:projectQueryList[i].projectName,
                    taskConfigId:projectQueryList[i].taskConfigId
                });
                // 项目编号
                projectNumList.push({
                    value:projectQueryList[i].projectId,
                    projectId:projectQueryList[i].projectId,
                    text:projectQueryList[i].projectNum,
                    taskConfigId:projectQueryList[i].taskConfigId
                })
            }
            if(callback) callback();
        }
    });
}

{
    // 编辑
    function editer(){
        // 刷新表格
        $table.bootstrapTable('resetView');

        $table.find('td>span').on('save',function (e,params) {
            var el = e.currentTarget;
            var _row = el.parentNode.parentNode.getAttribute("data-index");
            var _rowCls = el.className.split(" ")[0];
            if(_rowCls == 'taskHours'){
                var _cell = $(el.parentNode).prevAll().length - 7;
                newData[_row][_rowCls][_cell] = params.newValue;
            }else if(_rowCls == 'taskIs'){
                if(params.newValue == '1'){
                    newData[_row]['taskConfigCharge'] = true;
                    newData[_row][_rowCls] = '是';
                }else{
                    newData[_row]['taskConfigCharge'] = false;
                    newData[_row][_rowCls] = '否';
                }
            }else if(_rowCls == 'taskConfigName'){
                for(var i = 0; i < taskList.length; i++){
                    if(params.newValue == taskList[i]['value']){
                        newData[_row]['taskConfigId'] = params.newValue;
                        newData[_row][_rowCls] = taskList[i]['text'].replace(/(^\s*)|(\s*$)/g,'');
                    }
                }
            }else if (_rowCls == 'projectNum') {
                var tid = $(el).next().find('.input-sm').val();
                $.each(projectNameList,function (j,jval) {
                    if (tid==jval.projectId) {
                        $(el).parent().next().find('span').html(jval.text);
                        newData[_row]['projectId'] = jval.projectId;
                        newData[_row]['projectNum'] = $(el).next().find('.input-sm option:selected').text();
                        newData[_row]['projectName']=jval.text
                        newData[_row]['taskConfigName']=$(el).parents('tr').find('.taskConfigName').text();
                        newData[_row]['taskIs']=$(el).parents('tr').find('.taskIs ').text()
                    }
                })
            }else{
                newData[_row][_rowCls] = params.newValue;
            }
        });

        // 项目编号
        $('.projectNum').editable({
            source:projectNumList,
            success:function(){
                $table.bootstrapTable('resetView');
            }
        });


        // 任务
        $('.taskConfigName').editable({
            title:'请选择任务',
            value:taskList[0]['value'],
            source: taskList,
            success:function(){
                $table.bootstrapTable('resetView');
            }
        });

        // 是否计费
        $('.taskIs').editable({
            source:[
                {value: '1', text: '是'},
                {value: '2', text: '否'}
            ],
            success:function(){
                $table.bootstrapTable('resetView');
            }
        });

        // 职位
        $('.taskPosition').editable({
            success:function(){
                $table.bootstrapTable('resetView');
            }
        });

        // 地区
        $('.taskArea').editable({
            success:function(){
                $table.bootstrapTable('resetView');
            }
        });

        // 周期
        $('.taskHours').editable({
            placement:'left',
            success:function(){
                $table.bootstrapTable('resetView');
            }
        });
    }

    // 项目编号
    function projectNumFormatter(value, row, index) {
        return "<span class='projectNum' data-type='select' data-value="+row.projectId+">"+row.projectNum+"</span>";
    }

    // 项目名称
    function projectNameFormatter(value, row, index) {
        return "<span class='projectName' data-type='text'>"+value+"</span>";
    }
    // 任务
    function taskConfigNameFormatter(value, row, index) {
        return "<span class='taskConfigName' data-type='select' data-value="+ row.taskConfigId +">"+value+"</span>";
    }

    // 是否计费
    function taskIsFormatter(value, row, index){
        (row.taskConfigCharge == true) ? dataValue = 1 : dataValue=2;
        return "<span class='taskIs' data-type='select' data-value="+ dataValue +">"+value+"</span>";
        //return "<span class='taskIs' data-type='select' data-value="+ row.taskConfigCharge +">"+value+"</span>";
    }

    // 职位
    function taskPositionFormatter(value,row,index){
        return "<span class='taskPosition' data-type='text'>"+value+"</span>";
    }

    // 地区
    function taskAreaFormatter(value, row, index){
        return "<span class='taskArea' data-type='text'>"+value+"</span>";
    }

    // 周期
    function taskHoursFormatter(value, row, index){
        if(value == null){value = "-";}
        return "<span class='taskHours' data-type='number' data-max='24' data-min='0.5' data-step='0.5'>"+value+"</span>";
    }
}

// 获取列表
function list() {
    // 获取Id
    var workPeriodSheetId = tms.util.getUrlParam('workPeriodSheetId');
    // 获取周期时间
    var workPeriodFromDate = tms.util.getUrlParam('workPeriodFromDate');
    var workPeriodToDate = tms.util.getUrlParam('workPeriodToDate');
    getall = getAll(workPeriodFromDate,workPeriodToDate);

    tms.services.workPeriodSheetItemList({
        requestBody:{
            id:workPeriodSheetId
        },
        callback:function(res){

            var sheetRows = res['workPeriodSheetRows'];

            var allDatas = getAllData(sheetRows);
            // 格式化数据
            var i,j, data = [];
            for(i = 0; i < sheetRows.length; i++){
                var projectNum = "",
                    projectName = "";
                for(j = 0; j < projectQueryList.length; j++){
                    if(projectQueryList[j]['projectId'] == sheetRows[i]['projectId']){
                        projectNum = projectQueryList[j]['projectNum'];
                        projectName = projectQueryList[j]['projectName']
                    }
                }
                data.push({
                    // 唯一id
                    id: i,
                    // 项目id
                    projectId:sheetRows[i]['projectId'],
                    // 项目编号
                    projectNum:projectNum,
                    // 项目名称
                    projectName:projectName,
                    // 任务id
                    taskConfigId:sheetRows[i]['taskConfigId'],
                    // 任务
                    taskConfigName:sheetRows[i]['taskConfigName'],
                    // 是否计费（页面展示）
                    taskIs:(sheetRows[i]['taskConfigCharge'] == true) ? a="是" : a="否",
                    // 是否计费（保存需要）
                    taskConfigCharge:sheetRows[i]['taskConfigCharge'],
                    // 职位
                    taskPosition:sheetRows[i]['taskPosition'],
                    // 地区
                    taskArea:sheetRows[i]['taskArea'],
                    // 周期
                    taskDate:sheetRows[i]['taskDate'],
                    // 工时
                    taskHours:sheetRows[i]['taskHours'],
                    // 合计
                    taskAll:allDatas.rowData[i]
                });
            }

            var columns = [
                [{ field: 'state',
                    checkbox: true,
                    rowspan: 2,
                    align: 'center',
                    valign: 'middle'
                },{
                    field: "projectNum",
                    title: "项目编号",
                    colspan: 1,
                    rowspan: 2,
                    width:100,
                    valign: 'middle',
                    formatter:projectNumFormatter

                }, {
                    field: "projectName",
                    title: "项目名称",
                    colspan: 1,
                    rowspan: 2,
                    width:230,
                    valign: 'middle',
                    formatter:projectNameFormatter
                }, {
                    field: "taskConfigName",
                    title: "任务",
                    colspan: 1,
                    rowspan: 2,
                    width:100,
                    valign: 'middle',
                    formatter:taskConfigNameFormatter
                }, {
                    field: "taskIs",
                    title: "是否计费",
                    colspan: 1,
                    rowspan: 2,
                    width:50,
                    valign: 'middle',
                    formatter:taskIsFormatter
                }, {
                    field: "taskPosition",
                    title: "职位",
                    colspan: 1,
                    rowspan: 2,
                    valign: 'middle',
                    formatter:taskPositionFormatter

                }, {
                    field: "taskArea",
                    title: "地区",
                    colspan: 1,
                    rowspan: 2,
                    valign: 'middle',
                    formatter:taskAreaFormatter
                }, {
                    title: workPeriodFromDate +" ~ "+ workPeriodToDate,
                    align: 'center',
                    colspan: getall.length,
                    rowspan: 1
                },{
                    field: "taskAll",
                    title: "合计",
                    align: 'center',
                    valign: 'middle',
                    colspan: 1,
                    rowspan: 2
                }]
            ];
            var chartData =[];
            for(i = 0;i< getall.length;i++){
                if(getall[i].perWeakNum == 6 ||getall[i].perWeakNum == 0){
                    chartData.push({
                        field : "taskHours." + i ,
                        title: getall[i].perDay + '<br>' + getall[i].perWeak,
                        align: 'center',
                        cellStyle:'cellStyle',
                        colspan: 1,
                        rowspan: 1,
                        formatter:taskHoursFormatter
                    });
                }else{
                    chartData.push({
                        field : "taskHours." + i ,
                        title: getall[i].perDay + '<br>' + getall[i].perWeak,
                        align: 'center',
                        colspan: 1,
                        rowspan: 1,
                        formatter:taskHoursFormatter
                    });
                }
            }
            columns[1] = chartData;

            // 创建表格
            $table.bootstrapTable({
                columns: columns,
                data: data,
                striped: true,
                //fixedColumns: true,
                //fixedNumber: 7,
                height: getHeight()
                //clickToSelect: true                   // 是否启用点击选中行
            });
            newData = data;
            if (sheetRows.length !=0)
            {
                var strOne="";
                for(i = 0; i< allDatas.cellData.length; i++){
                    strOne+="'<th>"+ allDatas.cellData[i] +"</th>'";
                }

                var strTwo="";
                for(i = 0; i< allDatas.additionalData.length; i++){
                    strTwo+="'<th>"+ allDatas.additionalData[i] +"</th>'";
                }

                // 创建总计
                var insertText = "<tr class='headTwo'>" +
                    "<th ></th>" +
                    "<th></th>" +
                    "<th class='tlTitle'>每日总计</th>" +
                    "<th></th>" +
                    "<th></th>" +
                    "<th></th>" +
                    "<th></th>" +
                    strOne +
                    "<th>"+ allDatas.cellDataAll +"</th>" +
                    "</tr>"+

                    "<tr class='headTwo'>" +
                    "<th></th>" +
                    "<th></th>" +
                    "<th class='tlTitle'>每日额外工时</th>" +
                    "<th></th>" +
                    "<th></th>" +
                    "<th></th>" +
                    "<th></th>" +
                    strTwo +
                    "<th>"+ allDatas.additionalDataAll +"</th>" +
                    "</tr>";
                $('#table thead').append(insertText);
            }

        }
    })

}

// 合计
function getAllData(option){
    var rowData = [] ,
        cellData = [],
        additionalData = [];

    var taskHoursLength,
        cellDataAll = 0,
        additionalDataAll = 0;

    // 每一行的总值
    for(i = 0; i < option.length; i++){
        var rowAll = 0;
        for(j = 0; j < option[i]['taskHours'].length; j++){
            taskHoursLength = option[i]['taskHours'].length;
            rowAll+=option[i]['taskHours'][j];
        }
        rowData.push(rowAll);
    }

    // 每一列的总值
    for(i = 0; i < taskHoursLength; i++){
        var cellAll = 0;
        for(j = 0; j < option.length; j++){
            cellAll+=option[j]['taskHours'][i];
        }
        cellDataAll+=cellAll;
        cellData.push(cellAll);
        // 每日额外工时
        if(cellAll <= 8){
            additionalData.push("");
        }else{
            additionalData.push(cellAll-8);
            additionalDataAll+=(cellAll-8);
        }
    }

    return {
        // 每一行的值
        rowData:rowData,
        // 每一列的总值
        cellData:cellData,
        // 每日额外值
        additionalData:additionalData,
        // 每日总计值总值
        cellDataAll:cellDataAll,
        // 每日额外值总值
        additionalDataAll:additionalDataAll
    };
}

// 返回选中的行id
function getIdSelections() {
    return $.map($table.bootstrapTable('getSelections'), function (row) {
        return row.id
    });
}

// 周六周日变色
function cellStyle(value, row, index) {
    return {classes: ['warning']};
}

// 获取周期间的所有日期
{
    Date.prototype.format=function (){
        var s='';
        s+=this.getFullYear()+'-';          // 获取年份。
        s+=(this.getMonth()+1)+"-";         // 获取月份。
        s+= this.getDate();                 // 获取日。
        return(s);                          // 返回日期。
    };

    function getAll(begin,end){
        var ab = begin.split("-");
        var ae = end.split("-");
        var db = new Date();
        db.setUTCFullYear(ab[0], ab[1]-1, ab[2]);
        var de = new Date();
        de.setUTCFullYear(ae[0], ae[1]-1, ae[2]);
        var unixDb=db.getTime();
        var unixDe=de.getTime();
        var perDate = [];
        for(var k=unixDb;k<=unixDe;){
            // 创建一个数组
            var arys= new Array();
            // 获得输入日期
            arys=(new Date(parseInt(k))).format().split('-');
            var ssdate=new Date(arys[0],parseInt(arys[1]-1),arys[2]);
            // 获得当前是星期几
            var weak = ["周日","周一","周二","周三","周四","周五","周六"];
            perDate.push({
                perDay: ssdate.getDate(),
                perWeak: weak[ssdate.getDay()],
                perWeakNum:ssdate.getDay()
            });
            k=k+24*60*60*1000;
        }
        return perDate;
    }
}

// 获取浏览器高度
function getHeight() {
    return $(window).height() - $('.contral').outerHeight(true) - 100;
}

/* 提交通用 */
{
    //用户查询自己所在角色
    function eachRole(uid,data) {
        var userid=uid;
        var roles=data;
        for(var j=0;j<roles.length;j++){
            var roleUserList=roles[j].authorityRoleUserList;
            for(var n=0;n<roleUserList.length;n++){
                if(userid=roleUserList[n].userId) {
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


    //方式格式化
    function wayFormatter(){
        var select=['<select class="selectWay">'];
        select.push('<option value="0">主审</option>');
        select.push('<option value="1">知会</option>');
        select.push('</select>')
        return select.join('');
    }
}