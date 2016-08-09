'use strict';

class fscontrol {
    index( req,res,query ) {
        var path = "F:\\pomelochat\\chatofpomelo-websocket\\game-server";

        let param = qs.parse(query);
        if( param.path ) {
            path = param.path;
        }

        co(function* () {
            let list = [];
            yield fs.accessAsync(path);
            let stat = yield fs.statAsync(path);

            if( stat.isFile() ) {
                list.push({path:path,flag:1});
            } else {
                let files = yield fs.readdirAsync(path);
                for( var i = 0;i < files.length;i++ ) {
                    let temp = path + "/" + files[i];
                    let stat = yield fs.statAsync(temp);
                    if( stat.isFile() ) {
                        list.push({path:temp,flag:1});
                    } else {
                        list.push({path:temp,flag:0});
                    }
                }
            }

            let html = yield fs.readFileAsync(rootPath + "/view/index.html");
            res.end(ejs.render(html.toString(),{list:list}));
        }).catch((err)=>{
            console.log(err);
        });
    }
}

module.exports = function(){
    return new fscontrol();
}