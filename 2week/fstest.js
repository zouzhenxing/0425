'use strict';

var fs = require("fs");
var event = require("events");
var eventproxy = require("eventproxy");

exports.f1 = function() { //异步线程
    console.log("开始读取");
    
    fs.readFile("./HelloWord.js",( err,data )=>{//每个回调函数，默认有一个err
        if(err) {
            return console.log(err);
        }
        
        console.log(data.toString());
    });
    
    console.log("函数结束");
}

exports.f2 = function() {
    console.log("开始读取");
    var data = fs.readFileSync("./HelloWord.js");
    console.log(data.toString());
    console.log("读取完成");
}

exports.copy1 = function() { //复制文件?
    console.log("函数开始");
    fs.readFile("./HelloWord.js",( err,data )=>{
        if( err ) {
            return console.log(err);
        }
        console.log("读取文件成功","开始写入");
        fs.writeFile("./copy.js",data,(err)=>{
            if( err ) {
                return console.log(err);
            }
            console.log("写入成功");
        });
    });
    console.log("函数结束");
    
    var p = new Promise();
}

exports.copy2 = function() {
    let buf = new Buffer(512);
    //找开文件
    fs.open("./HelloWord.js","r", ( err,fd ) => { //callback hell
        if( err ) {
            return console.log(err);
        }
        //读取文件
        fs.read( fd,buf,0,buf.length,null,( err,length,data ) => {
            if( err ) {
                return console.log(err);
            }
            
            fs.open("./copy.js","w",( err,fd )=>{
               if( err ) {
                   return console.log( err );
               }
               
               console.log("读取了%d个字节",length);
               fs.write( fd,data,0,length,null,( err,lenght,data )=>{
                   if( err ) {
                       return console.log(err);
                   }
                   
                   console.log("写了%d个字节",lenght);
               });
               
               fs.close( fd,( err )=> {
                   if( err ) {
                        return console.log(err);                      
                   }
               });
            });
        });
        
        fs.close(fd,( err )=>{
            if( err ) {
                return console.log(err);
            }
        });
    });
}

exports.copy3 = function() {
    var em = new event.EventEmitter();
    em.on("copystart",( filename )=>{
        fs.open(filename,"r",( err,fd )=>{
            if( err ) {
                return console.log(err);
            }
            
            //触发读事件
            em.emit("copyread",fd);
        });
    });
    em.on("copyread",( fd )=>{
        let bf = new Buffer(512);
        fs.read(fd,bf,0,bf.length,null,( err,length,data )=> {
            if( err ) {
                return console.log(err);
            }
            
            console.log("一共读取了%d个字节",length);
            //开始写入
            em.emit("copywrite",length,data);
        });
        
        em.emit("close",fd);
    });
    em.on("close",( fd )=>{
        fs.close(fd,(err)=> {
           if(err) {
               return console.log(err);
           } 
        });
    });
    em.on("copywrite",(length,data)=> {
        fs.open("./copy.js","w",(err,fd)=>{
            if( err ) {
                return console.log(err);
            }
            fs.write(fd,data,0,length,null,( err,length,data )=> {
                if( err ) {
                    return console.log(err);
                }
                console.log("一共写入了%d个字节",length);
            });
            
            em.emit("close",fd);
        });
    });
    
    em.emit("copystart","./HelloWord.js");
}

exports.copy4 = function() {
    var fr = fs.createReadStream("./HelloWord.js");
    var fw = fs.createWriteStream("./copy.js");

    fr.on("data",( data )=>{
        fw.write(data);
    });
    fr.on("end",()=> {
        fw.end();
    });
}

exports.copy5 = function() {
    var fr = fs.createReadStream("./HelloWord.js");
    var fw = fs.createWriteStream("./copy.js");

    fr.pipe(fw);
}

exports.t1 = function() {
    // fs.access('F:\\pomelochat',(err)=>{
    //     if( err ) {
    //         return console.log(err);
    //     }

    //     console.log("文件存在");
    // });
    fs.stat('F:\\pomelochat',(err,stat)=>{
        if( err ) {
            return console.log(err);
        }

        console.log(stat.isDirectory());
    });
}

exports.t2 = function( path ) {
    fs.stat(path,(err,stat) => {
        if(err) {
            return console.log(err);
        }

        if( stat.isFile() ) {
            console.log(path + ":是一个文件");
        } else {
            fs.readdir(path,( err,files ) => {
                if( err ) {
                    return console.log(err);
                } else {
                    //异步循环
                    files.map(function( v ) {
                        var temp = path + "\\" + v;
                        fs.stat(temp,(err,stat)=>{
                            if(err) {
                                return console.log(err);
                            }
                            if(stat.isFile()) {
                                console.log(temp + "是一个文件");
                            } else if(stat.isDirectory()) {
                                console.log(temp + "是一个文件夹");
                            }
                        });
                    });
                    // for(let i = 0;i < files.length;i++) {
                    //     let temp = path + "\\" +files[i];
                    //     fs.stat(temp,(err,stat)=>{
                    //         if(err) {
                    //             return console.log(err);
                    //         }
                    //         if(stat.isFile()) {
                    //             console.log(temp + "是一个文件");
                    //         } else if(stat.isDirectory()) {
                    //             console.log(temp + "是一个文件夹");
                    //         }
                    //     });
                    // }
                }
            });
        }
    });
}

exports.t3 = function( path ) {
    var et = new event.EventEmitter();
    var arr = new Array();
    et.on("start",()=>{
        fs.stat(path,( err,stat ) => {
            if( err ) {
                return console.log(err);
            }
            if( stat.isFile() ) {
                arr.push({"path":path,"flag":0}); //0表示文件 1表示文件夹
                et.emit("end");
            } else if( stat.isDirectory() ) {
                et.emit("readDirectory");
            }
        });
    });
    et.on("readDirectory",()=>{
        fs.readdir(path,( err,files ) => {
            if( err ) {
                return console.log(err);
            }
            files.map(function( v ){
                let temp = path + "\\" + v;        
                fs.stat(temp,(err,stat)=>{
                    if(err) {
                        return console.log(err);
                    }
                    if(stat.isFile()) {
                        arr.push({"path":temp,"flag":0}); //0表示文件 1表示文件夹
                    } else if(stat.isDirectory()) {
                        arr.push({"path":temp,"flag":1}); //0表示文件 1表示文件夹
                    }
                    et.emit("end",files.length);
                });
            });
        });
    });

    var count = 0;
    et.on("end",( length ) => {
        if( length ) {
            count ++;
        }

        if( count == length || !length ) {
            console.log(arr);
        }
    });

    et.emit("start");
}

exports.t4 = function( path ) {
    var ep = new eventproxy();
   
    fs.stat(path,ep.done("start"));
    ep.on("start",( stat ) => {
        if( stat.isFile() ) {
            ep.emit("end",{"path":path,"flag":0});
        } else if( stat.isDirectory() ) {
            fs.readdir(path,ep.done("readdir"));
        }
    });
    ep.on("readdir",( files )=>{
         ep.after("readfiles",files.length,( list )=>{
             ep.emit("end",list);
         });

         files.map(function( v ) {
            let temp = path + "//" + v;
            fs.stat(temp,ep.group("readfiles",( stat )=>{
                if( stat.isFile() ) {
                    return {"path":temp,"falg":0};
                } else if( stat.isDirectory() ) {
                    return {"path":temp,"falg":1};
                }
            }));
        });
    });
    ep.on("end",( list )=>{
        console.log(list);
    })
    ep.fail(( err )=>{
        console.log(err);
    });
}

//异步队列(done().done().done())
//when(callback,callback).then();
//after(callbacks).then();
//EventProxy库(稳定) 对EventEmitter的封装