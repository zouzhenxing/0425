'use strict';
//系统模块引入
global.promise = require("bluebird");
global.co = require("co");
global.fs = promise.promisifyAll(require("fs"));
global.path = require("path");
global.express = require("express");
global.rootPath = __dirname;

//第三方模块引入
var bodyParser = require("body-parser");
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var ejs = require('ejs');
global.upload = require("multer")({dest: 'temp/'});
// var mditor = require("mditor");
// global.parser = new mditor.Parser();
/*mysql数据库连接配置*/
var mysql = require("mysql");
global.pool  = promise.promisifyAll(mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'epay',
  dateStrings : 'DATETIME'
}));

//自定义模块引入
global.util = require("./util/util.js");
global.loginService = require("./service/loginService.js");
global.adminService = require("./service/adminService.js");
global.apiService = require("./service/apiService.js");
global.loginModule = require("./module/loginModule.js");
global.adminModule = require("./module/adminModule.js");
var loginRouter = require("./router/loginRouter.js");
var adminRouter = require("./router/adminRouter.js");
var apiRouter = require("./router/apiRouter.js");

//初始化message
global.message = util.loadMesage();
//引入bodyparser中间件
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//引入session中间件
app.use(session({
    secret: '!@#$',
    resave: false,
    saveUninitialized: true
    // store: new RedisStore()
}));
// app.use(function( req,res,next ){
//     if( !req.session ) {
//         return next(new Error('redis is not connection'));
//     }

//     next();
// });
//设置ejs模板
app.set("views","./views");
app.set('view engine', 'html');
app.engine('.html', ejs.__express);
//静态页面托管
app.use(express.static('public'));
//挂载登录路由器
app.use("/login",loginRouter);
//挂载后台路由器
app.use("/admin",util.checkLogin,adminRouter);
//挂载API路由器
app.use("/API",util.crossDomain,apiRouter);
//处理favicon.ico请求
app.use(/.*favicon.ico$/,util.icohandle);
//404中间件
app.use(util.notfind);
//错误中间件
app.use(util.errorhandle);
//服务器错误守护
process.on('uncaughtException', (err) => {
    console.log(`Caught exception: ${err}`);
});
//服务器开启
var server = app.listen(80,()=>{
    console.log("服务器启动成",new Date().toString());
});