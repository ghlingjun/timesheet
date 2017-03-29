// Created by cde.chen on 17-3-22.

$(function () {
    navActive('timeFill')

    initData()

    //更早的周期
    $('.earlyDateBtn').on('click',function () {

        var  $table=$('#table')
        tms.services.workPeriodSheetEarlyDate({
            requestBody:{
                earlyDate:$('.earlyDate ').val()
            },
            callback:function(res){
                console.log(res)
                var data1 = [];
                $.each(res.data,function (i,val) {
                    data1.push({
                        // 周期
                        workPeriodDate:val.fromDate + " ~ " + val.toDate,
                        fromDate:val.fromDate,
                        toDate:val.toDate,
                        id:val.id,
                        periodTimeId:val.periodTimeId,
                        tenantId: val.tenantId,
                        //用户id
                        userId:val.userId,
                        // 总工时
                        workHour:val.workHour,
                        //审核状态
                        approvalStatus:status(val.approvalStatus),

                        // 最晚提交
                        submitDate:val.submitDate
                    })
                })

                $table.bootstrapTable('load', data1);

            }
        });
    })
})


//初始化加载
function initData() {
    var  $table=$('#table')
    tms.services.workPeriodSheetList({
        requestBody:{
        },
        callback:function(res){
            console.log(res)
            var data1 = [];
            $.each(res.data,function (i,val) {
                data1.push({
                    // 周期
                    workPeriodDate:val.fromDate + " ~ " + val.toDate,
                    fromDate:val.fromDate,
                    toDate:val.toDate,
                    id:val.id,
                    periodTimeId:val.periodTimeId,
                    tenantId: val.tenantId,
                    //用户id
                    userId:val.userId,
                    // 总工时
                    workHour:val.workHour,
                    //审核状态
                    approvalStatus:status(val.approvalStatus),
                    workHour:val.workHour,
                    // 最晚提交
                    submitDate:val.submitDate
                })
            })

            $table.bootstrapTable({
                data:data1,
                striped: true,       //是否显示行间隔色
                pagination: true,    //是否显示分页（*）
                clickToSelect: true, //是否启用点击选中行
                pageSize: 20,        //每页的记录行数（*）
                pageList:[10, 20, 50, 100]
            })
        }
    });
}

// 生成提交按钮
function actionFormatter(value, row, index) {
    return "<a href='javascript:;' onclick='submitTime("+row.id+")'>提交</a>";
}

// 生成周期
function dateFormatter(value,row,index){
    return "<a href='/timeFill/detail?workPeriodSheetId="+row.id+"&workPeriodFromDate="+row.fromDate+"" +
        "&workPeriodToDate="+ row.toDate+"&submitDate="+row.submitDate+"&workhour="+row.workHour+"' >"+value+"</a>";
}

//提交
function submitTime(id) {
    tms.services.approvalProcessList({
        requestBody: {
            "referencedType": "workperiodsheet",
            "referencedId": id
        },
        callback: function (res) {
            console.log(res)

            tms.alert('提交成功')

        }
    })
}




// 审批状态
function status(status){
    switch (status){
        case 0:
            status='未提交';
            break;
        case 1:
            status = '通过';
            break;
        case 2:
            status = '提交中';
            break;
        case 3:
            status = '拒绝';
            break;
    }
    return status;
}
