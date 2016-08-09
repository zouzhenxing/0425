'use strict';

exports.login = (conn,req) => {
    let sql = `select * from admin where name = '${req.body.username}' and pwd = '${req.body.password}'`;
    return new promise((resolve, reject)=>{
        conn.query(sql,(err,rows)=>{
            conn.release();
            if( err ) {
                reject();
            } else {
                resolve(rows);
            }
        });
    });
}