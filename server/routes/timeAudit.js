var express = require('express');
var router = express.Router();
var template = require('art-template');

/* GET login . */
router.get('/', function(req, res, next) {
    var html = template('timeAudit', {title:"工时审核"});
    res.send(html);
});

router.get('/detail', function(req, res, next) {
    var workPeriodFromDate = req.query.workPeriodFromDate;
    var workPeriodToDate = req.query.workPeriodToDate;
    var approvalSubmitDate = req.query.approvalSubmitDate;
    var workPeriodWorkhours = req.query.workPeriodWorkhours;
    var approvalUser = req.query.approvalUser;
    var html = template('timeAuditDetail', {
        title:"工时审核",
        workPeriodFromDate:workPeriodFromDate,
        workPeriodToDate:workPeriodToDate,
        workPeriodWorkhours:workPeriodWorkhours,
        approvalSubmitDate:approvalSubmitDate,
        approvalUser:approvalUser
    });
    res.send(html);
});

module.exports = router;
