var $table = $('#table');
var $input_project = $("#input_project");
var userInfo = tms.getLocalStorage("userInfo",true);
var personlist = [];
var hasUnSaveRecord = false;

// 修改、保存、取消按钮事件
window.operateEvents = {
    'click .btn_edit': function (e, value, row, index) {
        var tr = $(this).closest("tr");
        onEdit(tr);
    },
    'click .btn_save': function (e, value, row, index) {
        var tr = $(this).closest("tr");
        onSave(row.id, tr);
    },
    'click .btn_cancel': function (e, value, row, index) {
        var tr = $(this).closest("tr");
        onCancel(row.id, tr);
    },
    'click .btn_addperson': function (e, value, row, index) {
        var tr = $(this).closest("tr");
        onAddPerson(row.id, tr);
    },
    'click .btn_up': function (e, value, row, index) {
        onMove(row.id, "up");
    },
    'click .btn_down': function (e, value, row, index) {
        onMove(row.id, "down");
    }
};

$(function () {
    navActive("basicConfig");

    $("#copyprojectscon").on("mouseenter", ".copyprojectone", function (e) {
        $(e.target).addClass("copyprojectone_hot");
    }).on("mouseleave", ".copyprojectone", function (e) {
        $(e.target).removeClass("copyprojectone_hot");
    }).on("click", ".copyprojectone", function (e) {
        var $this = $(e.target);
        $this.parent().find(".copyprojectone_now").removeClass("copyprojectone_now");
        $this.addClass("copyprojectone_now");
    });

    $table.bootstrapTable({
        data: [],
        uniqueId: "id",
        //clickToSelect: true,
        striped: true,
        //pagination: true,
        //pageSize: 20,
        height: $("#content2").height() - 10,
        //pageList: [10, 20, 50, 100]
    });

    loadProjectSelet();

    loadPersonList(function () {
        $input_project.change(function () {
            loadList();
        });
        loadList();
    });
});


RResize.onResized(function () {
    $table.bootstrapTable('resetView', {
        height: $("#content2").height() - 10
    });
});


// 加载查询时和复制时的项目选项
function loadProjectSelet() {
    var projects = tms.getLocalStorage("origProjectList",true);
    var options = "";
    var html = "";
    $.each(projects, function (i, item) {
        if(item["projectId"]) {
            options += "<option value='" + item["projectId"] + "'>" + item["projectName"] + "</option>";
            html += "<div class='copyprojectone' pid='" + item["projectId"] + "'>" + item["projectName"] + "</div>";
        }
    });
    $input_project.html(options);
    $("#copyprojectscon").html(html);
}
// 加载所有用户
function loadPersonList(callback) {
    personlist = [];
    tms.services.origUserList({
        requestBody: {
            tokenType: "Bearer",
            refreshToken: userInfo.refreshToken
        },
        callback: function (res) {
            $.each(res["origUserDetailList"], function (i, item) {
                personlist.push({
                    Id: item["Id"],
                    Name: item["Name"]
                });
            });
            if(callback) callback();
        }
    });
}
// 加载表格内容
function loadList() {
    $table.bootstrapTable("removeAll");

    var projectId = $input_project.val();

    tms.services.functionTeamList({
        requestBody: {
            projectId: projectId,
            tokenType: "Bearer",
            refreshToken: userInfo.refreshToken
        },
        callback: function (res) {
            var btns = "";
            btns += "<input class='btn btn-warning btn_edit' type='button' data-permission='24' value='修改'/>";
            btns += "<input class='btn btn-info btn_save' type='button' value='保存' data-permission='24' style='display: none;'/>";
            btns += "<input class='btn btn-warning btn_cancel' type='button' value='取消' data-permission='24' style='display: none;'/>";
            btns += "<input class='btn btn-warning btn_addperson' type='button' data-permission='24' value='编辑人员'/>";

            var data = [];
            $.each(res["functionTeamList"], function (i, item) {
                data.push({
                    id: item["id"],
                    functionTeamSort: "<span class='btn_up'></span>&nbsp;<span class='btn_down'></span>",
                    functionTeamName: "<span class='text_ftname'>" + item['functionTeamName'] + "</span><input class='form-control input_ftname' type='text' style='display: none;'/>",
                    personlist: makeExistPersons(item, res["functionTeamPersonalList"]),
                    operations: btns
                });
            });

            $table.bootstrapTable("load", data);
        }
    });
}


// 生成已有人员
function makeExistPersons(functionTeam, existpersonlist) {
    var res = "";
    $.each(existpersonlist, function (i, person) {
        if (functionTeam["id"] == person["functionTeamId"]) {
            if(res != "") res += ", ";
            res += "<span class='existperson' pid='" + person["functionTeamPersonalId"] + "'>" + person["functionTeamPersonalName"] + "</span>";
        }
    });
    return res;
}


// 新增记录
function onAdd() {
    if(hasUnSaveRecord) {
        tms.alert("请先保存您刚才新增的记录");
        return;
    }

    var btns = "";
    btns += "<input class='btn btn-warning btn_edit' type='button' data-permission='24' value='修改' style='display: none;'/>";
    btns += "<input class='btn btn-info btn_save' type='button' data-permission='24' value='保存'/>";
    btns += "<input class='btn btn-warning btn_cancel' type='button' data-permission='24' value='取消'/>";
    btns += "<input class='btn btn-warning btn_addperson' type='button' data-permission='24' value='编辑人员' style='display: none;'/>";

    $table.bootstrapTable('append', {
        id: "temp",
        functionTeamSort: "",
        functionTeamName: "<span class='text_ftname' style='display: none;'></span><input class='form-control input_ftname' type='text'/>",
        personlist: "",
        operations: btns
    });
    hasUnSaveRecord = true;
}
// 删除选中记录
function onDelete() {
    var rows = $table.bootstrapTable("getSelections");
    if(rows.length<=0) {
        tms.alert("请选择要删除的列");
        return;
    }

    tms.confirm("确定要删除选中的记录吗？", function () {
        var projectId = $input_project.val();

        tms.services.functionTeamDel({
            requestBody: {
                id: rows[0].id,
                projectId: projectId
            },
            callback: function (res) {
                $.each(rows, function (i, row) {
                    $table.bootstrapTable("removeByUniqueId", row.id);
                });
            }
        });
    });
}
// 复制记录
function onCopy() {
    $('#window_copy').modal({ backdrop:'static' });
}
// 执行复制记录
function doCopy() {
    var projectId1 = $input_project.val();
    var projectId2 = $("#copyprojectscon .copyprojectone_now").attr("pid");
    if(!projectId2) {
        tms.alert("请选择要复制的项目");
        return;
    }

    tms.services.functionTeamCopy({
        requestBody: {
            projectId: projectId1,
            copyToProjectId: projectId2
        },
        callback: function (res) {
            $('#window_copy').modal('hide');
            loadList();
        }
    });
}


// 上移、下移记录
function onMove(id, type) {
    var projectId = $input_project.val();
    tms.services.functionTeamSort({
        requestBody: {
            id: id,
            projectId: projectId,
            functionTeamSort: type
        },
        callback: function (res) {
            loadList();
        }
    });
}
// 点击修改
function onEdit(tr) {
    tr.find(".btn_edit").hide();
    tr.find(".btn_save").show();
    tr.find(".btn_cancel").show();
    var ftname = tr.find(".text_ftname").hide().html();
    tr.find(".input_ftname").show().val(ftname);
}
// 点击保存
function onSave(id, tr) {
    var projectId = $input_project.val();
    var ftname = tr.find(".input_ftname").val();

    if(id == "temp") {
        tms.services.functionTeamAdd({
            requestBody: {
                projectId: projectId,
                functionTeamName: ftname
            },
            callback: function (res) {
                hasUnSaveRecord = false;
                // $table.bootstrapTable("removeByUniqueId", id);
                //
                //
                // var btns = "";
                // btns += "<input class='btn btn-warning btn_edit' type='button' data-permission='24' value='修改'/>";
                // btns += "<input class='btn btn-info btn_save' type='button' value='保存' data-permission='24' style='display: none;'/>";
                // btns += "<input class='btn btn-warning btn_cancel' type='button' value='取消' data-permission='24' style='display: none;'/>";
                // btns += "<input class='btn btn-warning btn_addperson' type='button' data-permission='24' value='编辑人员'/>";
                //
                // $table.bootstrapTable('append', {
                //     id: res.id,
                //     functionTeamSort: "",
                //     functionTeamName: "<span class='text_ftname'>" + ftname + "</span><input class='form-control input_ftname' type='text' style='display: none;'/>",
                //     personlist: "",
                //     operations: btns
                // });
                loadList();
            }
        });
    }
    else {
        tms.services.functionTeamUpd({
            requestBody: {
                id: id,
                projectId: projectId,
                functionTeamName: ftname
            },
            callback: function (res) {
                tr.find(".btn_edit").show();
                tr.find(".btn_save").hide();
                tr.find(".btn_cancel").hide();
                tr.find(".btn_addperson").show();
                var ftname = tr.find(".input_ftname").hide().val();
                tr.find(".text_ftname").show().html(ftname);
            }
        });
    }
}
// 点击取消
function onCancel(id, tr) {
    if(id == "temp") {
        $table.bootstrapTable("removeByUniqueId", id);
        hasUnSaveRecord = false;
    }
    else {
        tr.find(".btn_edit").show();
        tr.find(".btn_save").hide();
        tr.find(".btn_cancel").hide()
        var ftname = tr.find(".input_ftname").hide().val();
        tr.find(".text_ftname").show().html(ftname);
    }
}
// 点击编辑人员
function onAddPerson(id, tr) {
    // 获取所有已加入职能组的人员
    var eids= [];
    $table.find(".existperson").each(function () {
        var pid = $(this).attr("pid");
        if (pid) eids.push(pid);
    });

    // 获取当前职能组的人员
    var cids = [];
    tr.find(".existperson").each(function () {
        var pid = $(this).attr("pid");
        if (pid) cids.push(pid);
    });

    var res = "";
    $.each(personlist, function (i, person) {
        var id = person["Id"];
        if (cids.indexOf(id) >= 0) {
            res += "<label>";
            res += "<input class='checkboxone' type='checkbox' value='" + id + "' checked='checked'/>";
            res += person["Name"];
            res += "</label>";
            res += "&emsp;";
        }
    });
    $.each(personlist, function (i, person) {
        var id = person["Id"];
        if (eids.indexOf(id) < 0) {
            res += "<label>";
            res += "<input class='checkboxone' type='checkbox' value='" + id + "' />";
            res += person["Name"];
            res += "</label>";
            res += "&emsp;";
        }
    });
    $("#personcon").attr("fid", id).html(res);

    $('#window_personselect').modal({ backdrop:'static' });
}
// 保存人员
function onSavePerson() {
    var projectId = $input_project.val();

    var personcon = $("#personcon");

    var fid = personcon.attr("fid");

    var datas = [];
    personcon.find("input.checkboxone:checked").each(function () {
        var $this = $(this);
        datas.push({
            "id": 0,
            "functionTeamId": fid,
            "functionTeamPersonalId": $this.val(),
            "functionTeamPersonalName": $this.parent().text()
        });
    });

    tms.services.functionTeamPersonalSave({
        requestBody: {
            projectId: projectId,
            id: fid,
            functionTeamPersonalList: datas
        },
        callback: function (res) {
            $('#window_personselect').modal('hide');
            loadList();
        }
    });
}

