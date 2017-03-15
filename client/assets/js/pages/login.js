/**
 * Created by asus on 2017/2/28.
 */
$(document).ready(function(e) {
    //用户登录
    $("#loginbtn").click(function () {
        $("#errormsg").text("");
        var username = $("#input_username").val();
        var password = $("#input_password").val();
        if (username == "") {
            $("#errormsg").text("请输入用户名");
        } else if (password == "") {
            $("#errormsg").text("请输入密码");
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
                    $("#userLogin").hide();
                    $("#selectOrg").show();
                    $("#loginbtn").html("登&emsp;录");
                    var orgList = $("#selectOrg").find("select");
                    var optionTpl = '<option value="<%=companyId%>" data-userId="<%=userId%>"><%=companyName%></option>';
                    var list = data.origProjectList,
                        orgStrs = ['<option value="-1">---请选择公司---</option>'];
                    for(var i = 0,len = list.length;i<len;i++) {
                        orgStrs.push($.parseTpl(optionTpl,list[i]));
                    }
                    orgList.html(orgStrs.join(""));
                    //获取auth
                    auth_params.tokenType = data.tokenType;
                    auth_params.accessToken = data.accessToken;
                    $("#loginbtn").hide();
                    $("#loginbtn2").show();
                    console.log(data);
                }
            })
        }
    });

    //选择公司并登录验证
    var auth_params = {};
    $("#loginbtn2").click(function () {
        var companyId = $("#orgList").val();
        var userId = $("#orgList").find("option:checked").attr("data-userId");
        if(!userId) {
            $("#errormsg").text("请选择一个公司！");
            return false;
        }
        var userInfo = {};
        userInfo.companyId = companyId;
        userInfo.userId = userId;
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
                tms.setLocalStorage("userInfo",userInfo,true);
                window.location.href = "./index";
            }
        })
    })
})
