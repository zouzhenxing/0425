'use strict';
exports.index = (req,res,next) => {
    if( req.session.login ) {
        res.render('admin/admin.html',{user:req.session.login});
    } else {
        res.redirect(302,"/login.html");
    }
}

exports.admin = (req,res,next) => {
    co(function* () {
        let conn = yield pool.getConnectionAsync();
        let rows = yield adminModule.getAll(conn);
        
        res.render('admin/adminuser.html',{admins:rows});
    }).catch((err)=>{
        next(err);
    });
}

exports.goAddAdmin = (req,res,next) => {
    co(function* (){
        if( req.body.id != -1 ) {
            let conn = yield pool.getConnectionAsync();
            let rows = yield adminModule.getAdminById(conn,req.body.id);
            res.render('admin/addadmin.html',{admin:rows[0]});
        } else {
            res.render('admin/addadmin.html',{admin:false});
        }
    });
}

exports.addAdmin = (req,res,next) => {
    co(function* (){
        let conn = yield pool.getConnectionAsync();
        if( req.body.id ) { //修改操作
            yield adminModule.updateAdmin(conn,req.body);
        } else {  //新增操作
            yield adminModule.addAdmin(conn,req.body);
        }
        res.json(message.success).end();
    }).catch((err)=>{
        if( err.name == 'dbException' ) {
            console.log(err.stack);
            res.json(message.admin_err).end();
        } else {
            next(err);
        }
    });
}

exports.delAdmin = (req,res,next) => {
    co(function* (){
        let conn = yield pool.getConnectionAsync();
        if( req.body.id ) {
            yield adminModule.delAdmin(conn,req.body.id);
        } else if( req.body.ids ) {
            yield adminModule.delAdminIds(conn,req.body.ids);
        }
        
        res.json( message.success ).end();
    }).catch((err)=>{
        if( err.name == 'dbException' ) {
            console.log(err.stack);
            res.json( message.deladmin_err ).end();
        } else {
            next(err);
        }
    });
}

exports.typesMana = (req,res,next) =>{
    co(function* () {
        let conn = yield pool.getConnectionAsync();
        let rows = yield adminModule.getAllType(conn);

        res.render("type/typemana.html",{types:rows});
    }).catch((err)=>{
        next(err);
    })
}

exports.goAddType = (req,res,next) => {
    co(function* (){
        let conn = yield pool.getConnectionAsync();
        let roottype = yield adminModule.getRootType(conn);
        if( req.body.id == -1) {
            res.render("type/addtype.html",{rootTypes:roottype,obj:{}});
        } else {
            let conn = yield pool.getConnectionAsync();
            let rows = yield adminModule.getTypeById(conn,req.body.id);

            res.render("type/addtype.html",{rootTypes:roottype,obj:rows[0]});
        }
    }).catch((err)=>{
        next(err);
    });
}

exports.addType = (req,res,next) => {
    co(function* () {
        let conn = yield pool.getConnectionAsync();
        yield adminModule.addType(conn,req.body);

        res.json( message.success ).end();
    }).catch((err)=>{
        if(err.name == "dbException") {
            console.log(err.stack);
            res.json( message.type_err ).end();
        } else {
            next(err);
        }
    });
}

exports.listGoods = (req,res,next) => {
    co(function* (){
        let conn =  yield pool.getConnectionAsync();
        let rows =  yield adminModule.getAllGoods(conn);
        
        res.render("goods/listgoods.html",{goods:rows});
    }).catch((err)=>{
        if(err.name == "dbException") {
            console.log(err.stack);
            res.json( message.type_err ).end();
        } else {
            next(err);
        }
    });
}

exports.goAddGoods = (req,res,next) => {
    co(function* (){
        let conn = yield pool.getConnectionAsync();
        let types = yield adminModule.getAllType( conn );

        res.render("goods/addgoods.html",{types:types});    
    }).catch((err)=>{
        if(err.name == "dbException") {
            console.log(err.stack);
            res.json( message.type_err ).end();
        } else {
            next(err);
        }
    });
}

exports.addGoods = (req,res,next) => {
    co(function* (){
        //处理文件上传，将文件转到public/upfile目录下
        let filename = yield util.upfile(req.file);
        let conn = yield pool.getConnectionAsync();
        var param = [
            req.body.gname,
            req.body.price,
            "/upfile/" + filename, //url
            req.body.strock,
            req.body.info,
            req.body.type,
            req.session.login.id
        ];
        yield adminModule.addGoods(conn,param);
        
        res.json(message.success).end();
    }).catch((err)=>{
        if(err.name == "dbException") {
            console.log(err.stack);
            res.json( message.goods_err ).end();
        } else if( err.name == "upfileException" ) {
            console.log(err.stack);
            res.json( message.upfile_er ).end();
        } else {
            next(err);
        }
    });
}

exports.listNews = (req,res,next) => {
    co(function* () {
        let conn = yield pool.getConnectionAsync();
        let rows = yield adminModule.getAllNews(conn);

        res.render("news/listnews.html",{news:rows});
    }).catch((err)=>{
        if(err.name == "dbException") {
            console.log(err.stack);
            res.json( message.goods_err ).end();
        } else {
            next(err);
        }
    });
}

exports.goAddNews = (req,res,next) => {
    res.render("news/addnews.html");
}

exports.addNews = (req,res,next) => {
    co(function* (){
         let conn = yield pool.getConnectionAsync();
         yield adminModule.addNews(conn,[req.body.title,req.body.content]);

         res.json( message.success ).end();
    }).catch((err)=>{
        if(err.name == "dbException") {
            console.log(err.stack);
            res.json( message.news_err ).end();
        } else {
            next(err);
        }
    });
}

exports.preview = (req,res,next) => {
    co(function* () {
        let conn = yield pool.getConnectionAsync();
        let news = yield adminModule.getNewsById(conn,req.params.nid);
        res.send(news.content).end();
    }).catch((err)=>{
        if(err.name == "dbException") {
            console.log(err.stack);
            res.json(message.news_err).end();
        } else {
            next(err);
        }
    });
}

exports.upfile = (req,res,next) => {
    co(function* () {
        let filename = yield util.upfile(req.file);
        res.json({"success":true,"url":`/upfile/${filename}`}).end();
    }).catch((err)=>{
        if(err.name == "dbException") {
            console.log(err.stack);
            res.json(message.news_err).end();
        } else {
            next(err);
        }
    });
}