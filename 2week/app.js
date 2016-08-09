'use strict';
var promise = require("bluebird");
var fs = promise.promisifyAll(require("fs"));
var co = require("co");

var path = "D:\\nodeproject\\0425\\2week";
function index() {
    co(function* () {
        var stat = yield fs.statAsync(path);
        var arr = new Array();

        if( stat.isFile() ) {
            arr.push({"path":path,"flag":0});
        } else {
            let list = yield fs.readdirAsync(path);
            for( var i = 0;i < list.length;i++ ) {
                stat = yield fs.statAsync(path + "/" + list[i]);
                if( stat.isFile() ) {
                    arr.push({"path":path + "/" + list[i],"flag":0});
                } else {
                    arr.push({"path":path + "/" + list[i],"flag":1});
                }
            }
        }

        return arr;
    }).then((list)=>{
        return list;
    }).catch((err)=>{
        console.log(err,2);
    });
}

console.log(index());


// fs.readFileAsync("./HelloWorda.js").then(( data )=>{
//     console.log(data);
// }).then(( data )=>{
//     console.log("第二次",data);
// }).catch((err)=>{
//     console.log(err);
// }).finally(()=>{
//     console.log("finally");
// });

// var hello = require("./HelloWord.js");
// hello.hello();
// var t1 = require("./fstest.js");
// t1.f1();
// t1.f2();
// t1.copy1();
// t1.copy2();
// t1.copy3();
// t1.copy4();
// t1.copy5();
// t1.t3("F:\\pomelochat\\chatofpomelo-websocket\\README.md");
// t1.t3("F:\\pomelochat\\chatofpomelo-websocket");
// t1.t4("F:\\pomelochat\\chatofpomelo-websocket");
// function* test() {
//     var h = yield "hello";
//     var h1 = yield "world";
//     return h1;
// }

// var g = test();
// console.log(g.next());
// console.log(g.next());
// console.log(g.next());
