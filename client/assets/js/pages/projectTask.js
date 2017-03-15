/**
 * Created by hao.yu on 2017/3/9.
 */
var projectTable=$("#projectList");
$(function () {
    var userInfo=tms.getLocalStorage("userInfo",true);
    var softwareCode=userInfo.softwareCode;
    var accrssToken=userInfo.accessToken;
    var tokenType=userInfo.tokenType;
    var projectId=$(".form-control").val();
    var planVersionId=GetQueryString("id");
    // tms.services
    $('body').on('click','.hisVersion',function () {
        $('.hisVersion').removeClass('active');
        $(this).addClass('active');
    })
    tms.services.planConfigList({
        requestBody:{
            projectId:projectId,
            planVersionId:planVersionId,
        },
        callback:function (data) {
            projectTable.bootstrapTable({
                uniqueId:'id',
                treeShowField:'taskConfigCode',
                data:data
            });
            for(var i=0;i<data.length;i++){
                if(data[i].pid!=0&&data[i].pid) projectTable.bootstrapTable("hideRow",{uniqueId:data[i].id});
            }
            var testArr=[];
            for(var i=0;i<data.length;i++){
               // if(testArr.length==0) {data[i].lev=0;testArr.push(data[i]);continue;}
                if(data[i].lev===undefined){
                    data[i].lev=0;
                    testArr.push(data[i]);
                    eachJson(data[i],data,testArr);
                }
               // getChild(nodes);
               // var ind=ts.ind+1;
                //data[i].lev=ts.lev;
                //testArr.splice(ind, 0, data[i]);
            }
            var options=[];
            for(var i=0;i<testArr.length;i++){
                var hold=[];
                var len=parseInt(testArr[i].lev);
                for(var j=0;j<=len;j++){
                    hold.push("　")
                }
                options.push("<option value='"+testArr[i].id+"'>"+hold.join("")+testArr[i].taskConfigName+"</option>");
            }
            $('#task-type').html(options.join(""));
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
    //遍历子集
    function eachHideRow(row){
        var rows= projectTable.bootstrapTable("getRow",{name:'pid',val:row.id});
        for(var i=0;i<rows.length;i++){
            if(rows[i].nid) eachHideRow(rows[i]);
            rows[i].isExpand='off';
            projectTable.bootstrapTable("hideRow",{uniqueId:rows[i].id});
        }
        return false;
    }

/*    tms.services.taskConfigList({
        requestBody:{
            tenantId:"tm",
        },
        callback:function (data) {
            var i=0;
        }
    })*/

})
//是否有子集
function nameFormatter(val,row,ind) {
    if(row.nid){
        return "<span class='isParent'  data-uid='"+row.id+"'><i class='icon "+(row.isExpand=="on"?"icon-expand":"") +"'></i>"+val+"</span>";
    }
    return val;
}
function selectOnchang(val){
    var projectId=val;
    tms.services.planTaskList({
        requestBody:{
            projectId:projectId,
            planVersionId:"",
        },
        callback:function (data) {
            projectTable.bootstrapTable({
                data:data
            })
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
//获取浏览器参数
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
