$(function () {
    var auditTable=$("#auditTable");
    var userInfo=tms.getLocalStorage("userInfo",true);
    var softwareCode=userInfo.softwareCode;
    var accrssToken=userInfo.accessToken;
    var tokenType=userInfo.tokenType;

    tms.services.workPeriodApprovalList({
        requestBody:{
            softwareCode:softwareCode,
            accessToken:accrssToken,
            tokenType:tokenType
        },
        callback:function(data){
            var i=0;
            auditTable.bootstrapTable({
                data:data,
                striped: true,       //是否显示行间隔色
                pagination: true,    //是否显示分页（*）
                //clickToSelect: true, //是否启用点击选中行
                pageSize: 20,        //每页的记录行数（*）
                height: getHeight(),  //自适应窗口高度
                pageList:[10, 20, 50, 100]
            })
        }
    });

    //指定的200毫秒数后并重置宽度和高度
    setTimeout(function () {
        auditTable.bootstrapTable('resetView');
    }, 200);

    //对浏览器窗口调整大小进行计数并重置表格宽度和高度
    $(window).resize(function () {
        auditTable.bootstrapTable( 'resetView', {
            height: getHeight()
        });
        //当浏览器改变大小时调用模态框居中
        centerModals();
    });

    //当模态框显示后立即调用模态框居中函数
    $('.modal').on('show.bs.modal', centerModals);

    //初始化时间插件
    $("#dateTime01").datetimepicker({
        format: 'yyyy-mm-dd',
        minView:2,
        language:"zh-CN",
        autoclose:true
    });
    $("#dateTime02").datetimepicker({
        format: 'yyyy-mm-dd',
        minView:2,
        language:"zh-CN",
        autoclose:true
    });

});

//通用函数
{
    //模态框居中函数
    function centerModals() {
        $('.modal').each(function(i) {
            var $clone = $(this).clone().css('display', 'block').appendTo('body');
            var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
            top = top > 0 ? top : 0;
            $clone.remove();
            $(this).find('.modal-content').css("margin-top", top);
        });
    }

    //获取浏览器高度
    function getHeight() {
        return $(window).height() - $('.contral').outerHeight(true) - 100;
    }

}

//查看意见
function actionFormatter(value, row, index) {
    return "<a href='javascript:void(0);' onclick='view()'>查看意见</a>";
}

//周期
function dateFormatter(value,row,index){
    return "<a href='/timeAudit/timeAuditDetail' target='_self'>"+value+"</a>";
}

//查看意见模态框自定义参数
function view() {
    $('#view').modal({
        backdrop:'static'   //空白处禁止关闭弹出层
    });
}

