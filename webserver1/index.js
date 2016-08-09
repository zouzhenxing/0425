'use strict';

//系统模块
global.promise = require("bluebird");
global.co = require("co");
global.http = require("http");
global.fs = promise.promisifyAll(require("fs"));
global.url = require("url");
global.qs = require('querystring');
global.eventproxy = require("eventproxy");
//第三方模块
global.ejs = require("ejs");
//自定义模块
var fc = require("./control/fscontrol.js")();

//定义全局根路径
global.rootPath = __dirname;
global.staticPath = rootPath + "/public";

//web静态服务器
http.createServer(( req,res )=>{
    co(function* (){
        let path = staticPath + req.url;
        try {
            yield fs.accessAsync(path);
            var fr = fs.createReadStream(path);
            fr.pipe(res);
        } catch( err ) {
            if( req.url == "/" || req.url == "/index.html" ) {
                fc.index( req,res, url.parse(req.url).query );
            } else {
                throw new Error(404);
            }
        }
    }).catch((err)=>{
        if( err.message == 404 ) {
            res.statusCode = 302;//重定向
            res.setHeader("Location","/404.html");
            res.end();
        } else {
            console.log(err.stack);
        }
    });
    // var ep = new eventproxy();
    // ep.on("static",(err)=> {
    //     if( err ) {
    //         ep.emit("router");
    //     } else {
    //         var fr = fs.createReadStream( filepath );
    //         fr.pipe(res);
    //     }
    // });

    // ep.on("router",()=>{
    //     var obj = url.parse(req.url);
    //     if( obj.pathname == "/" || obj.pathname == "/index.html" ) {   
    //         fc.index( req,res,obj.query );
    //     } else {
    //         ep.emit("404");
    //     }
    // });

    // ep.on("404",()=>{
    //     res.statusCode = 302;//重定向
    //     res.setHeader("Location","/404.html");
    //     res.end();
    // });

    // if( req.url == "/" ) {
    //     ep.emit("router");
    // } else {
    //     var filepath = staticPath + req.url;
    //     fs.access(filepath,(err)=> {
    //         if( err ) {
    //             ep.emit("router");
    //         } else {
    //             var fr = fs.createReadStream( filepath );
    //             fr.pipe(res);
    //         }
    //     });
    // }
}).listen(80,function(){
    console.log("服务器启动成功!");
});