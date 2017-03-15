var express = require('express');
var router = express.Router();
var template = require('art-template');
/* GET login . */
router.get('/', function(req, res, next) {
    var html = template('login', {title:"工时项目-登录2"});
	res.send(html);
});

module.exports = router;
