/**
 * Created by yanmin.yu on 2017/3/23.
 * 任务配置
 */
$(function () {
    var userInfo = tms.getLocalStorage('userInfo', true),
        softwareCode = userInfo.softwareCode,
        accrssToken = userInfo.accessToken,
        tokenType = userInfo.tokenType;

    // 清空 或者 植入数据
    function clearOrSet(data) {
        var _data = data || {},
            charge = $('input[name="charge"]');

        $('.modal-title').text(_data.title || '新增任务');
        $('#taskCode').val(_data.taskConfigCode || ''),
        $('#taskName').val(_data.taskConfigName || ''),
        // charge.removeAttr('checked').parent().removeClass('checked');
        charge.prop('checked', false).parent().removeClass('checked');

        if (_data.taskConfigCharge || _data.taskConfigCharge === undefined) {
            // charge.eq(0).attr('checked', 'checked').parent().addClass('checked');
            charge.eq(0).prop('checked', true).parent().addClass('checked');
        } else {
            // charge.eq(1).attr('checked', 'checked').parent().addClass('checked');
            charge.eq(1).prop('checked', true).parent().addClass('checked');
        };   
    };

    // 新增任务
    $('.button-add').click(function() {
        // 清空
        clearOrSet();

        $('.modal-btn-cont').off('click.modal-btn-task').on('click.modal-btn-task', function() {
            var pid = 0,
                taskConfigCode = $('#taskCode').val(),
                taskConfigName = $('#taskName').val(),
                taskConfigCharge = $('input[name="charge"]:checked').val() === '1' ? true : false;

            // 为空弹
            if (!taskConfigCode || !taskConfigName) {
                alert('必填项不可为空!');

                return false;
            };

            // 请求初始数据
            tms.services.taskConfigAdd({
                requestBody: {
                    softwareCode: softwareCode,
                    accessToken: accrssToken,
                    tokenType: tokenType,
                    pid: pid,
                    taskConfigCode: taskConfigCode,
                    taskConfigName: taskConfigName,
                    taskConfigCharge: taskConfigCharge
                },
                callback: function(data) {
                    location.reload();
                }
            });
        })
    });
                        
    // 请求初始数据
    tms.services.taskConfigList({
        requestBody: {
            softwareCode: softwareCode,
            accessToken: accrssToken,
            tokenType: tokenType
        },
        callback: function(data) {
            var tree = {},
                arrBojS = {},
                tem = '';

            // 拿到数据不为长度不为0隐藏提示
            if (data.taskConfigList.length !== 0) $('.udt-not-info').hide();

            data.taskConfigList.forEach(function(val) {
                arrBojS[val.id] = val;
            });

            // 先遍历非根级的父子级关系
            // 找不到关系的剔除
            for (var item in arrBojS) {
                var val = arrBojS[item],
                    id = Number(val.id),
                    pid = Number(val.pid);

                if (pid !== 0) {
                    if (arrBojS[pid]) {
                        if (!arrBojS[pid].childArrS) arrBojS[pid].childArrS = {};

                        arrBojS[pid].childArrS[id] = val;
                    };
                };
            };

            // 拿出根级的数据
            for (var item in arrBojS) {
                var val = arrBojS[item];

                if (Number(val.pid) === 0) {
                    tree[val.id] = val;

                    // 生成根级模板
                    repeatTem(val);

                    // 生成子级的模板
                    isConti(val, repeatTem);
                };
            };

            // 将节点插入
            $('.udt-tbody').html(tem);

            // 子级表格伸缩
            eventUpDown();

            // 添加子级任务
            var addTaskBtn = $('.btn-addtask'),
                addTaskFn = function() {
                    var _this = this,
                        patt = /level([0-9]+)/,
                        curDom = addTaskBtn.eq(addTaskBtn.index(this)).parent().parent(),
                        parDom = curDom.parent(),
                        currId = patt.test(curDom.get(0).className) ? RegExp.$1 : null,
                        pid = patt.test(parDom.attr('id')) ? RegExp.$1 : 0;

                    // 清空
                    clearOrSet();

                    // 弹出新增框
                    $('.modal-btn-cont').off('click.modal-btn-task').on('click.modal-btn-task', function() {
                        var taskConfigCode = $('#taskCode').val(),
                            taskConfigName = $('#taskName').val(),
                            taskConfigCharge = $('input[name="charge"]:checked').val() === '1' ? true : false;

                        // 为空弹
                        if (!taskConfigCode || !taskConfigName) {
                            alert('必填项不可为空!');

                            return;
                        };

                        // 请求初始数据
                        tms.services.taskConfigAdd({
                            requestBody: {
                                softwareCode: softwareCode,
                                accessToken: accrssToken,
                                tokenType: tokenType,
                                pid: currId,
                                taskConfigCode: taskConfigCode,
                                taskConfigName: taskConfigName,
                                taskConfigCharge: taskConfigCharge
                            },
                            callback: function(data) {
                                var _data = $.extend(data, {
                                    pid: currId,
                                    taskConfigCode: taskConfigCode,
                                    taskConfigName: taskConfigName,
                                    taskConfigCharge: taskConfigCharge
                                });

                                // 加入到数据队列中
                                arrBojS[_data.id] = _data;

                                // 父数据关联
                                if (!arrBojS[currId].childArrS)  arrBojS[currId].childArrS = {};
                                arrBojS[currId].childArrS[_data.id] = _data;

                                // 前端新增DOM
                                var options = getN(_data),
                                    level = options.size,
                                    tem = '<div class="udt-tr level'+ _data.id +'">\
                                                <div class="udt-td">'+ options.str + (function(val) {
                                                    if (!isLast(val)) 
                                                        return '<span class="cont-btn btn btn-default btn-xs fl">\
                                                                    <span class="fa fa-plus"></span>\
                                                                </span>';

                                                    return '<span class="cont-btn btn btn-default btn-xs fl disabled" style="background: #ccc;">\
                                                                <span class="fa fa-plus"></span>\
                                                            </span>';
                                                })(_data) +'\
                                                <div class="cont-code" style="margin-left:'+( 11 + 21 * (level + 1) )+'px;">'+ taskConfigCode +'</div>\
                                            </div>\
                                            <div class="udt-td">'+ taskConfigName +'</div>\
                                            <div class="udt-td">'+ (function(val) { return val.taskConfigCharge ? '是' : '否' })(taskConfigCharge) +'</div>\
                                            <div class="udt-td">'+ (function(val, level) {
                                                if (level !== 9) 
                                                    return '<span class="btn-addtask btn btn-default btn-xs" data-toggle="modal" data-target="#taskConfig">\
                                                                <span class="fa fa-plus"></span>\
                                                            </span>';

                                                return '-';
                                            })(_data, level) +'</div>\
                                            <div class="udt-td">\
                                                <span class="udt-btn udt-btn-up" data-toggle="modal" data-target="#taskConfig">修改</span>\
                                                <span class="udt-btn udt-btn-del">删除</span>\
                                            </div>\
                                        </div>';

                                // 将节点插入
                                // 判断当前节点下一级的是否有属于当前节点的子节点区块，如果有就插入到区块尾部，没有的话就生成一个并插入当前节点的下一级
                                var nextDom = curDom.next();
                                if (nextDom.attr('id') === 'level'+ currId) {
                                    nextDom.append(tem);
                                } else {
                                    curDom.after('<div id="level'+ currId +'" class="udt-on-off">\
                                                    '+ tem +'\
                                                </div>');
                                };

                                // 移除禁止标识 / 展开子级
                                curDom.find('.cont-btn').removeClass('disabled').attr('style', '')
                                      .find('.fa').removeClass('fa-plus').addClass('fa-minus');                             
                                $('#level'+ currId).show(300);

                                // 重新绑定事件防止失效
                                addTaskBtn = $('.btn-addtask');
                                addTaskBtn.off('click.addTaskFn').on('click.addTaskFn', addTaskFn);
                                editTaskBtn = $('.udt-btn-up');
                                editTaskBtn.off('click.editTaskBtn').on('click.editTaskBtn', editTaskFn);
                                delTaskBtn = $('.udt-btn-del');
                                delTaskBtn.off('click.delTaskBtn').on('click.delTaskBtn', delTaskFn);

                                // 重新绑定表格伸缩
                                eventUpDown();
                            }
                        });
                        
                        // 关闭弹出框
                        $('#taskConfig').modal('hide');
                    });
                };
            addTaskBtn.on('click.addTaskFn', addTaskFn);

            // 修改任务
            var editTaskBtn = $('.udt-btn-up'),
                editTaskFn = function() {
                    var patt = /level([0-9]+)/,
                        curDom = editTaskBtn.eq(editTaskBtn.index(this)).parent().parent(),
                        currId = patt.test(curDom.get(0).className) ? RegExp.$1 : null,
                        codeDom = curDom.find('.cont-code'),
                        nameDom = curDom.find('.udt-td:nth-child(2)'),
                        chargeDom = curDom.find('.udt-td:nth-child(3)');

                    // 植入默认数据
                    clearOrSet({
                        title: '修改任务',
                        taskConfigCode: codeDom.text(),
                        taskConfigName: nameDom.text(),
                        taskConfigCharge: chargeDom.text() === '是' ? true : false,
                    });

                    // 弹出新增框
                    $('.modal-btn-cont').off('click.modal-btn-task').on('click.modal-btn-task', function() {
                        var taskConfigCode = $('#taskCode').val(),
                            taskConfigName = $('#taskName').val(),
                            taskConfigCharge = $('input[name="charge"]:checked').val() === '1' ? true : false;

                        // 为空弹
                        if (!taskConfigCode || !taskConfigName) {
                            alert('必填项不可为空!');

                            return;
                        };

                        // 请求数据
                        tms.services.taskConfigUpd({
                            requestBody: {
                                softwareCode: softwareCode,
                                accessToken: accrssToken,
                                tokenType: tokenType,
                                id: currId,
                                taskConfigCode: taskConfigCode,
                                taskConfigName: taskConfigName,
                                taskConfigCharge: taskConfigCharge
                            },
                            callback: function(data) {
                                codeDom.text(taskConfigCode);
                                nameDom.text(taskConfigName);
                                chargeDom.text(taskConfigCharge ? '是' : '否');
                            }
                        });

                        // 关闭弹出框
                        $('#taskConfig').modal('hide');
                    });
                };
            editTaskBtn.on('click.editTaskBtn', editTaskFn);

            // 删除任务
            var delTaskBtn = $('.udt-btn-del'),
                delTaskFn = function(e) {
                    var patt = /level([0-9]+)/,
                        curDom = delTaskBtn.eq(delTaskBtn.index(this)).parent().parent(),
                        currId = patt.test(curDom.get(0).className) ? RegExp.$1 : null;

                    tms.confirm('您确定删除本条任务？', function() {
                        var todelidList = [],
                            // 获取子id
                            getChildId = function(id) {
                                todelidList.push({
                                    id: id
                                });

                                if (arrBojS[id].childArrS) 
                                    for (var item in arrBojS[id].childArrS) 
                                        getChildId(arrBojS[id].childArrS[item].id);
                            };

                        // 遍历所有子节点id
                        getChildId(currId);

                        // 请求数据
                        tms.services.taskConfigDel({
                            requestBody: {
                                softwareCode: softwareCode,
                                accessToken: accrssToken,
                                tokenType: tokenType,
                                todelidList: todelidList
                            },
                            callback: function(data) {
                                // 判断父级
                                var parDomId = curDom.parent().attr('id');

                                // 判断当前节点是否有区块子节点集合，有就删了
                                if (curDom.next().attr('id') === 'level'+ currId) curDom.next().remove();
                                curDom.remove();

                                // 判断是否有关闭开关
                                var parDom = $('#'+ parDomId);
                                if (parDom.find('.udt-tr').length === 0) {
                                    parDom.remove();

                                    $('.'+ parDomId).find('.cont-btn').addClass('disabled').css('background', '#ccc')
                                                    .find('.fa').removeClass('fa-minus').addClass('fa-plus');
                                };

                                // 删除关联
                                todelidList.forEach(function(val) {
                                    var id = val.id,
                                        pid = arrBojS[id].pid;

                                    if (Number(pid) !== 0) {
                                        if (arrBojS[pid]) delete arrBojS[pid].childArrS[id];
                                        delete arrBojS[id];
                                    };
                                }); 
                                

                                // 重新事件，免得内存泄漏
                                addTaskBtn = $('.btn-addtask');
                                addTaskBtn.off('click.addTaskFn').on('click.addTaskFn', addTaskFn);
                                editTaskBtn = $('.udt-btn-up');
                                editTaskBtn.off('click.editTaskBtn').on('click.editTaskBtn', editTaskFn);
                                delTaskBtn = $('.udt-btn-del');
                                delTaskBtn.off('click.delTaskBtn').on('click.delTaskBtn', delTaskFn);
                                eventUpDown();
                            }
                        });                    
                    });
                };
            delTaskBtn.on('click.delTaskBtn', delTaskFn);



            // 重复模板
            function repeatTem(val) {
                var options = getN(val),
                    level = options.size;

                // 小于10级才能遍历数组
                if (level <= 9) {
                    tem +=  '<div class="udt-tr level'+ val.id +'">\
                                <div class="udt-td">'+ options.str +'\
                                    '+ (function(val) {
                                        if (!isLast(val)) 
                                            return '<span class="cont-btn btn btn-default btn-xs fl">\
                                                        <span class="fa fa-plus"></span>\
                                                    </span>';

                                        return '<span class="cont-btn btn btn-default btn-xs fl disabled" style="background: #ccc;">\
                                                    <span class="fa fa-plus"></span>\
                                                </span>';
                                    })(val) +'\
                                    <div class="cont-code" style="margin-left:'+( 11 + 21 * (level + 1) )+'px;">'+ val.taskConfigCode +'</div>\
                                </div>\
                                <div class="udt-td">'+ val.taskConfigName +'</div>\
                                <div class="udt-td">'+ (function(val) { return val.taskConfigCharge ? '是' : '否' })(val) +'</div>\
                                <div class="udt-td">'+ (function(val, level) {
                                    if (level !== 9) 
                                        return '<span class="btn-addtask btn btn-default btn-xs" data-toggle="modal" data-target="#taskConfig">\
                                                    <span class="fa fa-plus"></span>\
                                                </span>';

                                    return '-';
                                })(val, level) +'</div>\
                                <div class="udt-td">\
                                    <span class="udt-btn udt-btn-up" data-toggle="modal" data-target="#taskConfig">修改</span>\
                                    <span class="udt-btn udt-btn-del">删除</span>\
                                </div>\
                            </div>';
                };
            };

            // 是否最后一级
            function isLast(val) {
                if (val.childArrS) return false;

                return true;
            };

            // 取空格
            function getN(val) {
                var currIndex = 0,
                    str = '',
                    getIndex = function(val) {
                        var pid = Number(arrBojS[val.id].pid);
                        if (pid !== 0) {
                            currIndex++;

                            getIndex(arrBojS[pid]);
                        };
                    };

                // 执行获取当前index
                getIndex(val);

                for (var n = 0; n < currIndex; n++) {
                    if (n === currIndex - 1) {
                        str += '<span class="fl" style="width: 21px;color: #ccc;">'+ lmToAl(n + 1) +'</span>';
                    } else {
                        str += '<span class="fl" style="margin-top: 15px;width: 21px;border-bottom: 1px dashed #ddd;"></span>';
                    };
                };

                return {
                    str: str,
                    size: currIndex
                };
            };

            // 遍历操作子级数据
            function isConti(obj, cb) {
                var childArrS = obj.childArrS;

                if (childArrS) {
                    tem += '<div id="level'+ obj.id +'" class="udt-on-off">';

                    for (var item in childArrS) {
                        var val = childArrS[item];

                        // 执行回调
                        cb(val);

                        // 自我执行
                        isConti(val, cb);
                    };

                    tem += '</div>';
                };
            };

            // 阿拉伯转罗马
            function lmToAl(arabic) {
                var alpha = [ 'I', 'V', 'X', 'L', 'C', 'D', 'M' ], roman = "", bit = 0;

                while (arabic > 0){  
                    var tempnum = arabic % 10;
                    switch (tempnum){  
                        case 3:{   
                            roman = alpha[bit] + roman;  
                            tempnum--;
                        }  
                        case 2:{  
                            roman = alpha[bit] + roman;  
                            tempnum--;
                        }  
                        case 1:{  
                            roman = alpha[bit] + roman;  
                            break;  
                        }  
                        case 4:{  
                            roman = alpha[bit + 1] + roman;
                            roman = alpha[bit] + roman;  
                            break;  
                        }  
                        case 8:{  
                            roman = alpha[bit] + roman; 
                            tempnum--;
                        }  
                        case 7:{  
                            roman = alpha[bit] + roman; 
                            tempnum--;
                        }  
                        case 6:{  
                            roman = alpha[bit] + roman;  
                            tempnum--;
                        }  
                        case 5:{  
                            roman = alpha[bit + 1] + roman;  
                            break;  
                        }  
                        case 9:{ 
                            roman = alpha[bit + 2] + roman; 
                            roman = alpha[bit] + roman; 
                            break;  
                        }  
                        default:{  
                            break;  
                        }  
                    }  
                    bit += 2;  
                    arabic = Math.floor(arabic / 10);  
                };
                return roman;
            };

            // 绑定表格伸缩
            function eventUpDown() {
                var eventUpDownFn = function() {
                    var patt = /(level[0-9]+)/;

                    if (patt.test($(this).parent().parent().get(0).className)) {
                        var idName = '#'+ RegExp.$1;

                        if ($(idName).css('display') === 'none') {
                            $(this).find('.fa').removeClass('fa-plus').addClass('fa-minus');
                            $(idName).show(300);
                        } else {
                            $(this).find('.fa').removeClass('fa-minus').addClass('fa-plus');
                            $(idName).hide(300);
                        };
                    };
                };


                $('.cont-btn').off('click.eventUpDownFn').on('click.eventUpDownFn', eventUpDownFn);              
            };
        }
    });
});