'use strict';

exports.login = (req,res,next) => {
    co(function* (){
        let conn = yield pool.getConnectionAsync();
        var rows = yield loginModule.login(conn,req);
        if( rows.length ) {
            req.session.login = rows[0];
            res.json(message.success).end();
        } else {
            res.json(message.login_err).end();
        }
    }).catch((err)=>{
        if(err.name == "dbException") {
            console.log(err.stack);
            res.json(message.news_err).end();
        } else {
            next(err);
        }
    });
}