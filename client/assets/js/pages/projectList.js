/**
 * Created by hao.yu on 2017/3/9.
 */
$(function () {
    var projectTable=$("#projectList");
    var userInfo=tms.getLocalStorage("userInfo",true);
    var softwareCode=userInfo.softwareCode;
    var accrssToken=userInfo.accessToken;
    var tokenType=userInfo.tokenType;
    var projectId=$(".form-control").val();
   // tms.services
   tms.services.projectQuery({
       requestBody:{
           softwareCode:softwareCode,
           accessToken:accrssToken,
           tokenType:tokenType
       },
       callback:function (data) {
           projectTable.bootstrapTable({
               data:data.projects
           })
       }
   })
})
function nameFormatter(val,row,ind) {
    return "<a href='/projectList/projectTask?id="+row.projectId+"' >"+val+"</a>";
}
/**/
