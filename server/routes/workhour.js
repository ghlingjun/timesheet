/**
 * Created by sky.cai on 2017/3/28.
 */
var express = require('express');
var router = express.Router();
var template = require('art-template');
var config = require('../config');

/* GET 工时填报 . */
router.post('/workPeriodSheetItemSave.do', function(req, res, next) {
    var _param = req.body;
    var workPeriodSheetRows = _param.workPeriodSheetRows;
    if(workPeriodSheetRows && workPeriodSheetRows.length > 0){
        for(var i=0;i<workPeriodSheetRows.length;i++) {
            var taskHours = workPeriodSheetRows[i].taskHours;
            for(var j=0;j<taskHours.length;j++) {
                taskHours[j] = Number(taskHours[j]);
               /* if(taskHours[j]){
                    taskHours[j] = Number(taskHours[j]);
                }else {
                    taskHours[j] = null;
                }*/
            }
        }
    }
    config.request({
        request:req,
        callback:function (result) {
            res.json(result);
        }
    })
});

module.exports = router;