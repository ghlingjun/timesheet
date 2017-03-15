var express = require('express');
var router = express.Router();
var template = require('art-template');
/* GET login . */
router.get('/', function(req, res, next) {
    var html = template('timeAudit', {title:"工时审核"});
    res.send(html);
});

router.get('/timeAuditDetail', function(req, res, next) {
    var html = template('timeAuditDetail', {title:"工时审核"});
    res.send(html);
});

module.exports = router;
