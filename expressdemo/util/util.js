'use strict'

//加载配置
exports.loadMesage = () => {
    var data = fs.readFileSync(rootPath + "/config/message.json");
    return JSON.parse(data.toString());
}

//404方法
exports.notfind = (req,res,next) => {
    if( req.xhr ) {
        res.status(404).end();
    } else {
        res.status(302).set("Location","/404.html").end();
    }
}

//错误处理
exports.errorhandle = (err,req,res,next) => {
    console.log(req.url,new Date(),err.stack);
    if( req.xhr ) {
        res.status(500).end();
    } else {
        res.status(302).set("Location","/500.html").end();
    }
}

//处理favicon请求
exports.icohandle = (req,res,next)=> {
    res.sendFile(rootPath + "/public/favicon.ico");
}

//验证用户是否登录
exports.checkLogin = (req,res,next) => {
    if( req.session.login ) {
        next();
    } else if( req.xhr ) {
        res.status(302).end();
    } else {
        res.status(302).set("Location","/login.html").end();
    }
}

exports.upfile = (file) => {
    return new promise((resolve, reject)=>{
        //上传到temp目录的路径
        let source = rootPath + "/" + file.path;
        //新生成的文件名
        let filename = file.filename + path.extname(file.originalname);
        //文件最终的路径
        let target = rootPath + "/public/upfile/" + filename;
        let fr = fs.createReadStream(source);
        let fw = fs.createWriteStream(target);
        fr.pipe(fw);
        fr.on("end",()=>{
            fs.unlink(rootPath + "/" + file.path,function( err ){
                if( err ) {
                    err.name = 'upfileException';
                    reject(err);
                } else {
                    resolve(filename);
                }
            });
        });
    });
}

/*跨域中间件*/
exports.crossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
}