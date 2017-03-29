var userList=[];
var userInfo=null;
var roleId=null;
$(function () {
    var rightsAllotment=$('#rightsAllotment').bootstrapTable();
    var rightTable=$('#rightTable').bootstrapTable();
    userInfo=tms.getLocalStorage('userInfo',true);
    tms.services.authorityRoleList({
        requestBody:{
            "userIdList": [],
            "rightList": [],
            "authorityList": []
        },
        callback:function (data) {
            var roleList=data.authorityList
            rightsAllotment.bootstrapTable('load',roleList);
            if(!roleList||roleList.length<=0) return;
            var rights=data.authorityList[0].authorityRightList;
            var rows=[];
            var row;
            var pid=null;
            for(var i=0;i<rights.length;i++){
                if(rights[i].rightPid==0){
                    if(row) rows.push(row);
                    row={};
                    row.rightName=rights[i].rightName;
                    continue;
                }
                if(rights[i-1].rightPid==0&&rights[i].rightName=='只查看'){
                    row.rightItemName=[];
                    row.rightItemName.push('<label class="checkbox-inline"><input type="checkbox"  class="look-check" value="'+rights[i].id+'">'+rights[i].rightName+'</label>');
                    continue;
                } else if(rights[i-1].rightPid==0){
                    row.rightItemName=[];
                    row.rightChildName=rights[i].rightName;
                    continue;
                }
                if(rights[i+1]&&rights[i].rightPid!=0&&rights[i+1].rightName=='只查看'){
                    if(row) rows.push(row);
                    row={};
                    row.rightChildName=rights[i].rightName;
                    row.rightItemName=[];
                    continue;
                }
                if(rights[i].rightName=='只查看'){
                    row.rightItemName.push('<label class="checkbox-inline"><input type="checkbox" class="look-check" value="'+rights[i].id+'">'+rights[i].rightName+'</label>');
                    continue;
                }
                row.rightItemName.push('<label class="checkbox-inline"><input type="checkbox"  value="'+rights[i].id+'">'+rights[i].rightName+'</label>');
            }
            rows.push(row);
            rightTable.bootstrapTable('load',rows);
        }
    });
    tms.services.origUserList({
        requestBody:{
            "tokenType": userInfo.tokenType,
            "refreshToken":userInfo.refreshToken
        },
        callback:function (data) {
            userList= data.origUserDetailList;
            var userOptions=[];
            for(var i=0;i<userList.length;i++){
                userOptions.push('<div class="checkbox"><label><input type="checkbox" value="'+userList[i].Id+'">'+userList[i].Username+'</label></div>');
            }
            $('.cannot-users').find('.checkbox-group').html(userOptions.join(''));
            $('input').iCheck({
                checkboxClass: 'icheckbox_minimal',
                radioClass: 'iradio_minimal',
                increaseArea: '20%' // optional
            });
            $('input.only-look').on('ifChanged',function(e){
                var isTrue=$(this).prop('checked');
                if(isTrue){
                    $('.look-check').iCheck('check')
                }else{
                    $('.look-check').iCheck('uncheck');
                }
            });
        }
    })

})
function usersFormatter(val,row,ind) {
    var users=row.userIdList;
    var userNames=[];
    for(var i=0;i<users.length,i++;){
      var uid= users[i].id;
        userNames.push(searchUserName(uid));
    }
    return userNames.join('');
}
//查询用户名称
function searchUserName(id){
    var uid=id;
    for(var j=0;j<userList.length;j++){
        if(uid==userList[i].Id) return userList[i].Username;
    }
    return "";
}
function rightsFormatter() {
    return '<a class="allotment" href="javascript:void(0)">权限分配</a>';
}
function itemFormatter(val,row,ind) {
    return row.rightItemName.join('');
}
window.rightEvent= {
    'click .allotment':function(e, value, row, index){
        $("#myModal9").modal('show');
        $('input').iCheck('uncheck');
        roleId=row.id;
        for(var i=0;i<row.authorityRoleRightList.length;i++){
           var checkboxs= $("#myModal9").find('.checkbox-inline input[type=checkbox]');
           for(var j=0;j<checkboxs.length;j++){
               if($(checkboxs[j]).val()==row.authorityRoleRightList[i].rightId){
                   $(checkboxs[j]).iCheck('check');
               }
           }
        }
    }
}
//用户搜索
function enterPress(obj) {
    var searchTxt =$(obj).val();
    if (searchTxt) {
        $(obj).next().find('.checkbox').hide();
        $(obj).next().find('.checkbox:contains(' + searchTxt + ')').show();
    }else{
        $(obj).next().find('.checkbox').show();
    }
}
//移入
function shift_in() {
   var checkboxs= $('.cannot-users').find('.checkbox input[type=checkbox]');
   for (var i=0;i<checkboxs.length;i++){
        if($(checkboxs[i]).prop('checked')){
            $('.already-users').find('.checkbox-group').append($(checkboxs[i]).parent().parent().parent('.checkbox'))
        }
   }
}
//移出
function shift_out() {
    var checkboxs= $('.already-users').find('.checkbox input[type=checkbox]');
    for (var i=0;i<checkboxs.length;i++){
        if($(checkboxs[i]).prop('checked')){
            $('.cannot-users').find('.checkbox-group').append($(checkboxs[i]).parent().parent().parent('.checkbox'))
        }
    }
}
//新增角色
function saveRole() {
    var  userIdList=[];
    var roleName=$('#roleName').val();
    var roleMemo=$('#roleMemo').val();
    $('.already-users').find('input[type=checkbox]').each(function (i) {
        userIdList.push($(this).val());
    });
        tms.services.authorityRoleAdd({
        requestBody:{
            "tenantId": userInfo.tenantId,
            "roleName": roleName,
            "roleMemo": roleMemo,
            "userIdList": userIdList,
        },
        callback:function (data) {
           tms.alert('新增成功');
            location.reload()
        }
    })
}
//修改
function actionFormatter() {
    return ['<a href="javascript:void(0)" class="editRole">修改</a>','<a href="javascript:void(0)" class="deleteRole">删除</a>'].join('');
}
window.actionEvents= {
    'click .editRole':function (e, value, row, index) {
        $('#myModal10').modal('show');
        var userIdList=row.authorityRoleUserList;
        for (var i=0;i<userIdList.length;i++){
            $('.already-users').find('.checkbox-group').append($('.cannot-users').find('input:checkbox[value='+userIdList[i].userId+']').parent().parent().parent('.checkbox'));
        }
    },
    'click .deleteRole':function (e, value, row, index) {
        var roleid=row.id;
        tms.confirm('确认删除角色吗？',function () {
            tms.services.authorityRoleDel({
                requestBody:{
                    "id": roleid,
                },
                callback:function () {
                    tms.alert('删除成功');
                    location.reload()
                }
            })
        })
    }
}
function onlyLook(obj) {
    var isTrue=$(this).prop('checked');
    $('.look-check').attr('checked',isTrue);
}
function saveRights() {
    var nowRights=[];
    var checkboxs= $('#rightTable').find('.checkbox-inline input[type=checkbox]');
    for (var i=0;i<checkboxs.length;i++){
        if($(checkboxs[i]).prop('checked')){
            nowRights.push($(checkboxs[i]).val())
        }
    }
    tms.services.authorityRoleRightAdd({
        requestBody:{
            "id": roleId,
            "rightList":nowRights,
        },
        callback:function (data) {
            location.reload();
        }
    })
}