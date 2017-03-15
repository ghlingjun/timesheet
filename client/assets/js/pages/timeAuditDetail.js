var $table = $('#table');

$(function () {
    buildTable($table);

    //指定的200毫秒数后并重置宽度和高度
    setTimeout(function () {
        $table.bootstrapTable('resetView');
    }, 200);

    //对浏览器窗口调整大小进行计数并重置表格宽度和高度
    $(window).resize(function () {
        $table.bootstrapTable( 'resetView', {
            height: getHeight()
        });
    });

});

function buildTable($el) {
    var i, j, row;

    var data = [{
        "num": 1011,
        "name": "重组抗ERP",
        "task":"实验前研究会议",
        "counts": {
            "s2": "526",
            "s3": "122",
            "s4": "122",
            "s5": "122",
            "s6": "122",
            "s7": "122",
            "s8": "122",
            "s9": "122",
            "s10": "122",
            "s11": "122",
            "s12": "122",
            "s13": "122",
            "s14": "122",
            "s15": "122",
            "s16": "122",
            "s17": "122",
            "s18": "122",
            "s19": "122",
            "s20": "122"
        }
    }, {
        "num": 1011,
        "name": "重组抗ERP",
        "task":"实验前研究会议",
        "counts": {
            "s2": "526",
            "s3": "122",
            "s4": "122",
            "s5": "122",
            "s6": "122",
            "s7": "122",
            "s8": "122",
            "s9": "122",
            "s10": "122",
            "s11": "122",
            "s12": "122",
            "s13": "122",
            "s14": "122",
            "s15": "122",
            "s16": "122",
            "s17": "122",
            "s18": "122",
            "s19": "122",
            "s20": "122"
        }
    }, {
        "num": 1011,
        "name": "重组抗ERP",
        "task":"实验前研究会议",
        "counts": {
            "s2": "526",
            "s3": "122",
            "s4": "122",
            "s5": "122",
            "s6": "122",
            "s7": "122",
            "s8": "122",
            "s9": "122",
            "s10": "122",
            "s11": "122",
            "s12": "122",
            "s13": "122",
            "s14": "122",
            "s15": "122",
            "s16": "122",
            "s17": "122",
            "s18": "122",
            "s19": "122",
            "s20": "122"
        }
    }, {
        "num": 1011,
        "name": "重组抗ERP",
        "task":"实验前研究会议",
        "counts": {
            "s2": "526",
            "s3": "122",
            "s4": "122",
            "s5": "122",
            "s6": "122",
            "s7": "122",
            "s8": "122",
            "s9": "122",
            "s10": "122",
            "s11": "122",
            "s12": "122",
            "s13": "122",
            "s14": "122",
            "s15": "122",
            "s16": "122",
            "s17": "122",
            "s18": "122",
            "s19": "122",
            "s20": "122"
        }
    }, {
        "num": 1011,
        "name": "重组抗ERP",
        "task":"实验前研究会议",
        "counts": {
            "s2": "526",
            "s3": "122",
            "s4": "122",
            "s5": "122",
            "s6": "122",
            "s7": "122",
            "s8": "122",
            "s9": "122",
            "s10": "122",
            "s11": "122",
            "s12": "122",
            "s13": "122",
            "s14": "122",
            "s15": "122",
            "s16": "122",
            "s17": "122",
            "s18": "122",
            "s19": "122",
            "s20": "122"
        }
    }, {
        "num": 1011,
        "name": "重组抗ERP",
        "task":"实验前研究会议",
        "counts": {
            "s2": "526",
            "s3": "122",
            "s4": "122",
            "s5": "122",
            "s6": "122",
            "s7": "122",
            "s8": "122",
            "s9": "122",
            "s10": "122",
            "s11": "122",
            "s12": "122",
            "s13": "122",
            "s14": "122",
            "s15": "122",
            "s16": "122",
            "s17": "122",
            "s18": "122",
            "s19": "122",
            "s20": "122"
        }
    }, {
        "num": 1011,
        "name": "重组抗ERP重组抗ERP",
        "task":"实验前研究会议实验前",
        "counts": {
            "s2": "526",
            "s3": "122",
            "s4": "122",
            "s5": "122",
            "s6": "122",
            "s7": "122",
            "s8": "122",
            "s9": "122",
            "s10": "122",
            "s11": "122",
            "s12": "122",
            "s13": "122",
            "s14": "122",
            "s15": "122",
            "s16": "122",
            "s17": "122",
            "s18": "122",
            "s19": "122",
            "s20": "122"
        }
    }];
    var columns = [
        [{
            "field": "num",
            "title": "项目编号",
            "colspan": 1,
            "rowspan": 2,
            width:100
        }, {
            "field": "name",
            "title": "项目名称",
            "colspan": 1,
            "rowspan": 2,
            width:100
        }, {
            "field": "task",
            "title": "任务",
            "colspan": 1,
            "rowspan": 2,
            width:100
        }, {
            "title": "2017.1~2017.2",
            "colspan": 20,
            "rowspan": 1
        }],
        [{
            "field": "counts.s2",
            "title": "2(周四)",
            "colspan": 1,
            "rowspan": 1
        }, {
            "field": "counts.s3",
            "title": "3(周四)",
            "colspan": 1,
            "rowspan": 1
        }, {
            "field": "counts.s4",
            "title": "4(周四)",
            "colspan": 1,
            "rowspan": 1
        }, {
            "field": "counts.s5",
            "title": "5(周四)",
            "colspan": 1,
            "rowspan": 1
        }, {
            "field": "counts.s6",
            "title": "6(周四)",
            "colspan": 1,
            "rowspan": 1
        }, {
            "field": "counts.s7",
            "title": "7(周四)",
            "colspan": 1,
            "rowspan": 1
        }, {
            "field": "counts.s8",
            "title": "8(周四)",
            "colspan": 1,
            "rowspan": 1
        }, {
            "field": "counts.s9",
            "title": "9(周四)",
            "colspan": 1,
            "rowspan": 1
        }, {
            "field": "counts.s10",
            "title": "10(周四)",
            "colspan": 1,
            "rowspan": 1
        }, {
            "field": "counts.s11",
            "title": "11(周四)",
            "colspan": 1,
            "rowspan": 1
        }, {
            "field": "counts.s12",
            "title": "12(周四)",
            "colspan": 1,
            "rowspan": 1
        }, {
            "field": "counts.s13",
            "title": "13(周四)",
            "colspan": 1,
            "rowspan": 1
        }, {
            "field": "counts.s14",
            "title": "14(周四)",
            "colspan": 1,
            "rowspan": 1
        }, {
            "field": "counts.s15",
            "title": "15(周四)",
            "colspan": 1,
            "rowspan": 1
        }, {
            "field": "counts.s16",
            "title": "16(周四)",
            "colspan": 1,
            "rowspan": 1
        }, {
            "field": "counts.s17",
            "title": "17(周四)",
            "colspan": 1,
            "rowspan": 1
        }, {
            "field": "counts.s18",
            "title": "18(周四)",
            "colspan": 1,
            "rowspan": 1
        }, {
            "field": "counts.s19",
            "title": "19(周四)",
            "colspan": 1,
            "rowspan": 1
        }, {
            "field": "counts.s20",
            "title": "20(周四)",
            "colspan": 1,
            "rowspan": 1
        }]
    ];
    // for (i = 0; i < cells; i++) {
    //     columns.push({
    //         field: 'field' + i,
    //         title: 'Cell' + i
    //     });
    // }
    // for (i = 0; i < rows; i++) {
    //     row = {};
    //     for (j = 0; j < cells; j++) {
    //         row['field' + j] = 'Rows-' + i + '-' + j;
    //     }
    //     data.push(row);
    // }
    $el.bootstrapTable('destroy').bootstrapTable({
        columns: columns,
        data: data,
        fixedColumns: true,
        fixedNumber: 3,
        height: getHeight()
    });
}


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