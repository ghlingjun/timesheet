/**
 * Created by asus on 2017/2/28.
 */
$(document).ready(function(e) {
    //用户登录
    $("#loginbtn").click(function () {
        $("#errormsg").text("");
        var username = $("#input_username").val();
        var password = $("#input_password").val();
        if (username == "" || password == "") {
            $("#errormsg").text("用户名和密码不可为空！");
        } else {
            $("#loginbtn").html("登录中...");
            var params = {
                grantType:"password",
                ip:"unknown",
                softwareCode:"WHK",
                userName:username,
                password:password
            }
             tms.services.origUserLogin({
                requestBody:params,
                callback:function (data){
                    $("#loginbtn").html("登&emsp;录");
                    var orgList = $("#selectOrg").find("select");
                    var optionTpl = '<option value="<%=companyId%>" data-userId="<%=userId%>" data-userName="<%=nameOfUser%>"><%=companyName%></option>';
                    var list = data.origProjectList,
                        orgStrs = ['<option value="-1">---请选择公司---</option>'];
                    for(var i = 0,len = list.length;i<len;i++) {
                        orgStrs.push($.parseTpl(optionTpl,list[i]));
                    }
                    orgList.html(orgStrs.join(""));
                    //获取auth
                    auth_params.tokenType = data.tokenType;
                    auth_params.accessToken = data.accessToken;
                    tms.setLocalStorage("origProjectList",data.origProjectList,true);
                    if(list.length == 1) {
                        orgList[0].selectedIndex = 1;
                        $("#loginbtn2").click();
                        return false;
                    }
                    $("#userLogin").hide();
                    $("#loginbtn").hide();
                    $("#selectOrg").show();
                    $("#loginbtn2").show();
                }
            })
        }
    });

    //选择公司并登录验证
    var auth_params = {};
    $("#loginbtn2").click(function () {
        var companyId = $("#orgList").val();
        var checked = $("#orgList").find("option:checked");
        var userId = checked.attr("data-userId");
        var userName = checked.attr("data-userName");
        if(!userId) {
            $("#errormsg").text("请选择一个公司！");
            return false;
        }
        var userInfo = {};
        userInfo.companyId = companyId;
        userInfo.companyName = checked.text();
        userInfo.userId = userId;
        userInfo.userName = userName;
        tms.setLocalStorage("userInfo",userInfo,true);//header 信息
        //auth_params.companyId = companyId;
        tms.services.origUserAuth({
            requestBody:auth_params,
            callback:function (data) {
                console.log(data);
                var userInfo = tms.getLocalStorage("userInfo",true);
                userInfo.refreshToken = data.refreshToken;
                userInfo.accessToken = data.accessToken;
                userInfo.tokenType = data.tokenType;
                userInfo.softwareCode = "WHK";
                userInfo.permission = getPermission(data);
                tms.setLocalStorage("userInfo",userInfo,true);
                if(userInfo.permission.indexOf(1) > -1) {
                    window.location.href = "./projectList";
                }else{
                    window.location.href = "./planApproval";
                }
            }
        })
    });


    /**
     * [description 权限数据转换]
     1 -> 工时计划
     2 -> 工时计划->查看
     3 -> 工时计划->更新版本
     4 -> 工时计划-》编辑任务
     5 -> 工时计划-》提交
     6 -> 工时计划-》导出
     7 -> 工时填报
     8 -> 工时填报->查看
     9 -> 工时填报-》编辑
     10 -> 工时填报-》提交
     11 -> 工时统计
     12 -> 工时统计->查看
     13 -> 工时统计-》导出
     14 -> 基础设置
     15 -> 基础设置->规则设置
     16 -> 基础设置->规则设置-》查看
     17 -> 基础设置->规则设置->编辑
     18 -> 基础设置->规则设置-》导出
     19 -> 基础设置->任务配置
     20 -> 基础设置->任务配置->查看
     21 -> 基础设置->任务配置-》编辑
     22 -> 基础设置->词典管理
     23 -> 基础设置->词典管理->查看
     24 -> 基础设置->词典管理-》编辑
     25 -> 基础设置->权限设置
     26 -> 基础设置->权限设置->查看
     27 -> 基础设置->权限设置-》编辑角色
     28 -> 基础设置->权限设置-》编辑权限
     * @return {[Array]}  [1, 2, 6, 21, 19, 14]
     */
    var getPermission = function (data) {
        var roleList = data.authorityRoleUserList;
        var rightList = data.authorityRoleRightList;
        var allList = data.authorityRightList;
        var roles = [];
        var rightRoles = [];
        for(var i=0;i<roleList.length;i++) {
            var role = roleList[i];
            roles.push(role.roleId);
        }
        for(var m=0;m<rightList.length;m++) {
            var right = rightList[m];
            var roleId = right.roleId;
            if(roles.indexOf(roleId) > -1) {
                if(rightRoles.indexOf(right.rightId) < 0) {
                    rightRoles.push(right.rightId);
                }
            }
        }
        var moduleIds = [];
        var modules = [];
        for(var n=0;n<allList.length;n++) {
            var all = allList[n];
            if(all.dataType == "module") {
                modules.push(all);
            }else{
                if(rightRoles.indexOf(all.id) > -1 && rightRoles.indexOf(Number(all.rightPid)) <0) {
                    rightRoles.push(Number(all.rightPid));
                    moduleIds.push(Number(all.rightPid));
                }
            }
        }
        for(var k=0;k<modules.length;k++) {
            var module = modules[k];
            var id = module.id;
            if(moduleIds.indexOf(id) > -1 && rightRoles.indexOf(Number(module.rightPid)) <0) {
                rightRoles.push(Number(module.rightPid));
            }
        }
        return rightRoles;
    }
})
