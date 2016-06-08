'use strict';

class fscontrol {
    index( req,res,query ) {
        var ep = new eventproxy();

        this.showdir( ep,qs.parse(query) );
        this.readhtml( ep );

        ep.all("readend","readfile",( list,html )=>{
            var str = "<ul>";
            list.map((v)=>{
                str += "<li>" + v.path + ":" + (v.falg ? "文件夹" : "文件") + "</li>";
            });
            str += "</ul>";
            str = html.toString().replace("{{content}}",str);
            res.end(str);
        });
        ep.fail(( err )=>{
            res.end("文件夹不存在");
        });
    }
    showdir( ep,param ) {
        var path = 'F:\\pomelochat\\chatofpomelo-websocket';
        if( param.path ) {
            path = param.path;
        }
        
        fs.stat(path,ep.done("start"));
        ep.on("start",( stat ) => {
            if( stat.isFile() ) {
                ep.emit("readend",[{"path":path,"flag":0}]);
            } else if( stat.isDirectory() ) {
                fs.readdir(path,ep.done("readdir"));
            }
        });
        ep.on("readdir",( files )=>{
            ep.after("readfiles",files.length,( list )=>{
                ep.emit("readend",list);
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
    }

    readhtml( ep ) {
        fs.readFile( rootPath + "/view/index.html",ep.done("readfile"));
    }
}

module.exports = function(){
    return new fscontrol();
}