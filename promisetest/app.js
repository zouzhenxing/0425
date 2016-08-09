'use strict';
var promise = require("bluebird");
var fs = promise.promisifyAll(require("fs"));

// var path = "./package.json";
var path = "D:\\nodeproject\\0425\\promisetest";

var list = new Array();
fs.statAsync(path).then((stat)=>{
    if( stat.isFile() ) {
        list.push({path:path,falg:1});
    } else if( stat.isDirectory() ) {
        return fs.readdirAsync(path);
    }
}).then((files)=>{
    var pros = [];
    files.map(function( file ){
        let temp = path + '/' + file;
        let p = fs.statAsync(temp).then((stat)=>{
            if( stat.isFile() ) {
                list.push({path:temp,falg:1});
            } else {
                list.push({path:temp,falg:0});
            }
        });
        pros.push(p);
    });
    
    return promise.all(pros);
}).catch((err)=>{
    console.log(err);
}).finally(()=>{
    console.log(list);
});//promise链