'use strict';

//系统模块
global.http = require("http");
global.fs = require("fs");
global.url = require("url");
global.qs = require('querystring');
//第三方模块
global.eventproxy = require("eventproxy");
//自定义模块
var fc = require("./control/fscontrol.js")();

//定义全局根路径
global.rootPath = __dirname;
global.staticPath = rootPath + "/public";

//web静态服务器
http.createServer(( req,res )=>{
    var filepath = 0;
    var obj = url.parse(req.url);
    
    if( obj.pathname == "/" || obj.pathname == "/index.html" ) {   
        return fc.index( req,res,obj.query );
    } else if( req.url == "/favicon.ico" ) {
        filepath = staticPath + "/favicon.ico";
    } else {
        filepath = staticPath + req.url;
    }

    fs.access(filepath,(err)=> {
        if( err ) {
            res.statusCode = 302;//重定向
            res.setHeader("Location","/404.html");
            res.end();
            return;
        }

        var fr = fs.createReadStream( filepath );
        fr.pipe(res);
    });
}).listen(80,function(){
    console.log("服务器启动成功!");
});

// var server = http.createServer();
// server.on('request',( req,res )=>{
//     var rootPath = "./public";
//     var filepath = 0;

//     if( req.url == "/favicon.ico" ) {
//         filepath = rootPath + "/favicon.ico";
//     } else if( req.url == "/" ) {
//         filepath = rootPath + "/index.html";
//     } else {
//         filepath = rootPath + req.url;
//     }

//     fs.access(filepath,(err)=> {
//         if( err ) {
//             res.statusCode = 302;//重定向
//             res.setHeader("Location","/404.html");
//             res.end();
//             return;
//         }

//         var fr = fs.createReadStream( filepath );
//         fr.pipe(res);
//     })
// });
// server.listen(80,function(){
//     console.log("服务器启动成功!");
// });