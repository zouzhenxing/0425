'use strict';
var promise = require("bluebird");
var co = require("co");
var fs = promise.promisifyAll(require("fs"));

// var path = "./package.json";
var path = "D:\\nodeproject\\0425\\promisetest";

var list = [];
co(function* () {
    let stat = yield fs.statAsync(path);
    if( stat.isFile() ) {
        list.push({path:path,flag:1});
    } else {
        let files = yield fs.readdirAsync(path);
        for( var i = 0;i < files.length;i++ ) {
            let temp =  path + "/" + files[i];
            let stat =  yield fs.statAsync(temp);
            if( stat.isFile() ) {
                list.push({path:temp,flag:1});
            } else {
                list.push({path:temp,flag:0});
            }
        }
    }
}).then(()=>{
    console.log(list);
}).catch((err)=>{
    console.log(err);
});

// function* add( val ) {
//     var res = yield val + 1;
//     yield res + 1;
//     return res;
// }
// var a = add(1);

// console.log(a.next( a.next().value ));
// console.log(a.next());
// function* test() {
//     yield "hello";
//     yield "world";
//     return "ending";
// }

// var it = test(); //迭代器
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());