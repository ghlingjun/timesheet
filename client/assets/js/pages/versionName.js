/**
 * Created by cde.chen on 2017/3/17.
 */

$(function () {
    navActive("basicConfig");

    $(".nav2").mouseenter(function () {
        $(this).addClass("nav2_hot");
    }).mouseleave(function () {
        $(this).removeClass("nav2_hot");
    }).click(function () {
        var url = $(this).attr("url");
        if(url) window.location.href = url;
    });

    initData()
})

function initData() {
    $('.form-control').attr('disabled',true)
    $('.checkedSub ').iCheck('disable')

    tms.services.versionNameList({
        requestBody:{},
        callback:function (res) {
           //console.log(res.versionNameList)

            var data1 = [];
            var len='';
            $.each(res["versionNameList"], function (i, item) {
                if (i ==0)
                    len='first'
                else if (i==res["versionNameList"].length-1)
                    len = 'last'
                else
                    len = ''
                data1.push({
                    id: item["id"],
                    functionTeamSort: "<span class='btn_up' onclick=\"trSort('"+item.id+"','up','"+len+"')\"></span>&nbsp;<span" +
                    " class='btn_down' onclick=\"trSort('"+item.id+"','down','"+len+"')\"></span>",
                    versionName: item['versionName'],
                    operations: actionFormatter
                });
            });

            $('#table').bootstrapTable({
                data: data1
            })
        }
    })
}

function trSort(id,sort,isSort) {
    if (sort =='up' && isSort=='first')
        tms.alert('已经是第一条了')
    else if (sort=='down'&&isSort=='last')
        tms.alert('已经是最后一条了')
    else
    {
        //行排序
        tms.services.versionNameSort({
            requestBody:{
                "versionId":id,
                "versionSort": sort
            },
            callback:function (data) {
                tms.services.versionNameList({
                    requestBody:{},
                    callback:function (res) {

                        var data1 = [];
                        var len='';
                        $.each(res["versionNameList"], function (i, item) {
                            if (i ==0)
                                len='first'
                            else if (i==res["versionNameList"].length-1)
                                len = 'last'
                            else
                                len = ''
                            data1.push({
                                id: item["id"],
                                functionTeamSort: "<span class='btn_up' onclick=\"trSort('"+item.id+"','up','"+len+"')\"></span>&nbsp;<span" +
                                " class='btn_down' onclick=\"trSort('"+item.id+"','down','"+len+"')\"></span>",
                                versionName: item['versionName'],
                                operations: actionFormatter
                            });
                        });

                        $('#table').bootstrapTable('load',data1)
                    }
                })
            }
        })
    }
}

//返回修改按钮
function actionFormatter(value, row, index) {
    return '<span class="leftBtn" "><a href="javascript:;" onclick="editTr(this)" class="editBtn">修改</a>&nbsp;<a' +
        ' href="javascript:;" onclick="delTr(this,'+row.id+')" class="delBtn" >删除</a></span><span class="rightBtn"' +
        ' style="display:none"><a href="javascript:;" class="appBtn" onclick="saveTr(this,0)" data-id="'+row.id+'">保存</a>&nbsp;<a href="javascript:;"' +
    ' onclick="cancleTr(this)"' +
        ' class="appBtn" >取消</a></span>';
}

// 修改
function editTr(obj) {
    var val=$(obj).parents('td').prev().text()
    $(obj).parents('td').prev().text('')
    $(obj).parents('td').prev().append("<input type='text' class='vName' value='"+val+"'  autofocus='autofocus'/>")
    $(obj).parents('td').find('.rightBtn').show().end().find('.leftBtn').hide()
    $(obj).parents('td').prev().attr('data-val',val)
}

//保存
function saveTr(obj,type) {
    var val=$(obj).parents('td').prev().find('.vName').val()

    if ($.trim(val)=='')
    {
        tms.alert('版本名称不能为空')
    }
    else {
        //修改的保存
        if (type==0)
        {
            tms.services.versionNameUpd({
                requestBody:{
                    versionId:$(obj).attr('data-id'),
                    versionName:val
                },
                callback:function (data) {
                    console.log(data)
                    $(obj).parents('td').prev().html(val)
                    $(obj).parents('td').find('.rightBtn').hide().end().find('.leftBtn').show()
                    tms.alert('保存成功')
                }
            })
        }

        //添加的保存
        else
        {
            tms.services.versionNameAdd({
                requestBody:{
                    versionName:val
                },
                callback:function (data) {
                    console.log(data)
                    $(obj).parents('td').prev().html(val)
                    $(obj).parents('td').find('.rightBtn').hide().end().find('.leftBtn').show()
                    tms.alert('保存成功')
                }
            })
        }
    }

}


//取消
function cancleTr(obj) {
    var val=$(obj).parents('td').prev().attr('data-val')
    $(obj).parents('td').prev().html(val)
    $(obj).parents('td').find('.rightBtn').hide().end().find('.leftBtn').show()
}


//添加行
function  addTr(tbId) {
    var len= $('#'+tbId+' tbody tr').length+1
    var tr = "<tr><td></td><td><input type='text' value='' class='vName' autofocus='autofocus'/></td><td><span" +
        " class='leftBtn'" +
        " style='display:none'><a" +
        " href='javascript:;'  onclick='editTr(this)' class='editBtn' >修改</a>&nbsp;<a href='javascript:;' onclick='delTr(this)' class='appBtn'>删除</a></span><span class='rightBtn' style='display:inline-block'><a href='javascript:;' class='appBtn' onclick='saveTr(this,1)'" +
        "  >保存</a>&nbsp;<a href='javascript:;' onclick='delTr(this)' class='appBtn' >删除</a></span></td></tr>"

    $('#'+tbId).append(tr)
}

//删除添加的行
function  delTr(obj,id) {
    tms.alert('不能删除')
    /*tms.confirm('是否要删除？',function (index) {
        $(obj).parents('tr').remove()

    })*/
}