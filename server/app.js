const express = require('express');
const path = require('path');
const fs = require('fs');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const bodyParser = require('body-parser');
const compression = require('compression');
//引用artTemplate模块
const template = require('art-template');
const config = require('./config');
const app = express();
const identity = require('./routes/identity');
const workhour = require('./routes/workhour');
const login = require('./routes/login');
const index = require('./routes/index');
const timeAudit = require('./routes/timeAudit');
const projectList = require('./routes/projectList');
const modal = require('./routes/modal');
const basicConfig = require('./routes/basicConfig');
const planApproval=require('./routes/planApproval');
const timeCharts=require('./routes/timeCharts');
const timeFill=require('./routes/timeFill');

//const demo = require('./routes/demo');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
//用art-template引擎替换默认的jade引擎
//app.set('view engine', 'jade');
template.config('base',app.get('views'));
template.config('extname','.html');
app.engine('.html',template.__express);
app.set('view engine','html');
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'));
app.use(logger('common', {stream: accessLogStream}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
/*app.use(session({
 cookie: {name:"tms",maxAge: 36*1000 },
 resave: true, // don't save session if unmodified
 saveUninitialized: false, // don't create session until something stored
 store: new RedisStore({
 host:'192.168.1.216',
 port:'6379',
 db:7,
 pass:'redis123'
 }),
 secret: 'tms'
 }));*/
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'demo')));  //demo目录，
const urls = require("./public/assets/js/modules/urls");
app.get('/',function (req, res, next) {
    res.redirect("/login");
});
app.get('/logout',function (req,res) {
    /*res.cookie('userInfo', "", {
     path:'/', httpOnly:true
     });*/
    res.clearCookie('userInfo', { path: '/' });
    res.redirect('/login');
});
app.use(function(req,res,next){
    if (!req.cookies.userInfo) {
        if(req.url=="/login" || req.url.indexOf("/identity") > -1){
            next();//如果请求的地址是登录则通过，进行下一个请求
        }else{
            res.redirect('/login');
        }
    } else if (req.cookies.userInfo) {
        next();
    }
});
app.use('/login', login);
app.use('/identity', identity);
app.use('/workhour', workhour);
app.use('/projectList',projectList);
app.use('/timeAudit', timeAudit);
app.use('/basicConfig', basicConfig);
app.use('/modal',modal);
app.use('/planApproval',planApproval);
app.use('/timeCharts', timeCharts);
app.use('/timeFill', timeFill);
//app.use('/demo', demo);

app.use('/index', index);
// 该路由使用的中间件，所有异步接口入口
app.post("*",function(req, res, next) {
    //res.setHeader("Access-Control-Allow-Origin","*");
    //var tms = JSON.parse(req.cookie.tms);
    /* res.cookie('tms', req.cookies.tms, {
     maxAge:360*1000, path:'/', httpOnly:true
     });*/
    config.callback(req, res, next);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send("404页面没找到路径");
});

module.exports = app;