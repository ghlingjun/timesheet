// Created by cde.chen on 17-3-10.

$(function () {
    navActive('basicConfig')

    $('input').iCheck({
        checkboxClass: 'icheckbox_minimal',
        radioClass: 'iradio_minimal',
        increaseArea: '20%' // optional
    });

    //日期
    $(".wdate").datetimepicker({
        format: 'yyyy-mm-dd',
        minView: 2,
        language: "zh-CN",
        autoclose: true
    })

    //导出
    $('.outExcel').on('click',function () {
        if ($.trim($('.startOut').val())=='')
            tms.alert('请选择有效的结束日期')
        else if ($.trim($('.endOut').val())=='')
            tms.alert('请选择有效的开始日期')
    })
    /*var softwareCode=userInfo.softwareCode;
    var accrssToken=userInfo.accessToken;
    var tokenType=userInfo.tokenType;*/
    initData()

    //初始化加载
    function initData() {
        $('.form-control').attr('disabled',true)
        $('.checkedSub ').iCheck('disable')

        tms.services.periodRuleDetail({
            requestBody:{},
            callback:function (data) {
               // console.log(data)
                $('.startDate').val(data.startDate)
                $('.deadLine ').val(data.daysAllowSubmitAfterDeadline)
                $('.timeWeek').val(data.cycleType)
                $('.weekTime input').iCheck('disable')
                $.each($('.weekTime input'),function () {
                    var tval=$(this).val();
                    if (data.cycleType==tval)
                        $(this).iCheck('check')
                })
                if (data.allowSubmitBeforeEndDate==true)
                    $('.subYes').iCheck('check')
                else
                    $('.subNo').iCheck('check')
                //$('.canSubDay ').val(data.daysFromEndDateToSubmitDeadline)
                //$('.deadLine  ').val(data.daysFromSubmitDeadlineToSubmitDeadline)
                $('.editBtn').attr('data-tenId',data.tenantId)

                $('.saveBtn').attr('data-id',data.tenantId)
            }
        })
    }


    //修改
    $('.editBtn').on('click',function () {


        //规则设置能否修改周期
        tms.services.periodRuleCanChangeCycleType({
            requestBody:{
                "tenantId": $('.editBtn').attr('data-tenId')
            },
            callback:function (data) {
                //console.log(data)
                if (data.canChangeCycleType) {
                    $('.timeWeek').attr('disabled', true)
                    $('.form-control').attr('disabled',false)
                    $('.checkedSub , .weekTime input').iCheck('enable')
                    $('.saveBtn').show()
                    $(this).hide()
                }
                else {
                 tms.alert('存在审核通过或审核中的工时周期，不可修改')
                }

            }
        })
    })


    //保存
    $('.saveBtn').on('click',function () {
        var ckVal=''
        if ($('.weekTime .checked'))
            $.each($('.weekTime .checked'),function () {
                ckVal=$(this).find('input').val()
            })

        if ($.trim($('.startDate').val())=='') {
            tms.alert('必填项不可为空')
            return false;
        }

        if ($.trim($('.deadLine').val())=='') {
            tms.alert('必填项不可为空')
            return false;
        }

        var canVal=''
        if ($('.canSub .checked'))
            $.each($('.canSub .checked'),function () {
                canVal=$(this).find('input').val()
            })

        tms.services.periodRuleSave({
            requestBody:{
                "startDate":$('.startDate').val(),
                "cycleType":ckVal,
                "daysFromEndDateToSubmitDeadline": $('.deadLine').val(),
                "allowSubmitBeforeEndDate": canVal,
                "daysAllowSubmitAfterDeadline": '0',
                "daysFromSubmitDeadlineToSubmitDeadline": '0'
            },
            callback:function (data) {
               // console.log(data)
                initData()
                $('.editBtn').show()
                $('.saveBtn').hide()
                tms.alert('保存成功')
            }
        })
    })
})
