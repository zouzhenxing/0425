'use strict';

exports.getAll = ( conn )=> {
    let sql = "select * from admin";
    return new promise((resolve, reject) => {
        conn.query(sql,(err,rows)=>{
           conn.release();
           err ? reject( err ) : resolve(rows); 
        });
    });
}

exports.addAdmin = (conn,params) => {
    let sql = `insert into admin values(default,'${params.username}','${params.password}',1)`;
    return new promise((resolve, reject)=>{
        conn.query(sql,(err,result)=>{
            conn.release();
            if(err) {
                err.name="dbException";
                reject(err)
            } else {
                resolve(result.insertId);
            }  
        });
    });
}

exports.delAdmin = (conn,id) => {
    let sql = `delete from admin where id = ${id}`;
    return new promise((resolve, reject)=>{
        conn.query(sql,(err,result)=>{
            conn.release();
            if( err ) {
                err.name = 'dbException';
                reject( err );
            } else {
                resolve(result.affectedRows);
            }
        });
    });
}

exports.delAdminIds = (conn,ids) => {
    let sql = `delete from admin where id in (${ids})`;
    return new promise((resolve, reject)=>{
        conn.query(sql,(err,result)=>{
            conn.release();
            if( err ) {
                err.name = 'dbException';
                reject( err );
            } else {
                resolve(result.affectedRows);
            }
        });
    });
}

exports.getAdminById = (conn,id) => {
    let sql = `select * from admin where id = ${id}`;
    return new promise((resolve, reject)=>{
        conn.query(sql,(err,rows)=>{
            conn.release();
            if( err ) {
                err.name = 'dbException';
                reject( err );
            } else {
                resolve(rows);
            }
        });
    });
}

exports.updateAdmin = (conn,params) => {
    let sql = `update admin set name = '${params.username}',pwd = '${params.password}' where id = ${params.id}`;
    return new promise((resolve, reject)=>{
        conn.query(sql,(err,result)=>{
            conn.release();
            if( err ) {
                err.name = 'dbException';
                reject( err );
            } else {
                resolve(result);
            }
        });
    });
}

exports.getAllType = (conn) => {
    let sql = "select t1.id,t1.typename,t2.typename as pid from goodstype t1 left join goodstype t2 on t1.pid = t2.id";

    return new promise((resolve, reject)=>{
        conn.query(sql,(err,rows)=>{
            conn.release();
            if( err ) {
                err.name = 'dbException';
                reject( err );
            } else {
                resolve(rows);
            }
        });
    });
}

exports.addType = (conn,params) => {
    let sql = "insert into goodstype values(default,?,?)";

    return new promise((resolve, reject)=>{
        conn.query(sql,[params.typename,params.pid],(err,result)=>{
            conn.release();
            if( err ) {
                err.name = 'dbException';
                reject( err );
            } else {
                resolve(result.affectedRows);
            }
        });
    });
}

exports.getRootType = (conn) => {
    let sql = "select * from goodstype where pid = 0";
    return new promise((resolve, reject)=>{
        conn.query(sql,(err,rows)=>{
            conn.release();
            if( err ) {
                err.name = 'dbException';
                reject( err );
            } else {
                resolve( rows );
            }
        });
    });
}

exports.getTypeById = (conn,id) => {
    let sql = "select * from goodstype where id = ?";
    return new promise((resolve, reject)=>{
        conn.query(sql,[id],(err,rows)=>{
            conn.release();
            if( err ) {
                err.name = 'dbException';
                reject( err );
            } else {
                resolve( rows );
            }
        });
    });
}

exports.getAllGoods = (conn) => {
    let sql = "select * from goods";
    return new promise((resolve, reject)=>{
        conn.query(sql,(err,rows)=>{
            conn.release();
            if( err ) {
                err.name = 'dbException';
                reject( err );
            } else {
                resolve( rows );
            }
        });
    });
}

exports.addGoods = (conn,params) =>{
    let sql = "insert into goods values(default,?,?,?,?,?,?,?)";
    return new promise((resolve, reject)=>{
        conn.query(sql,params,(err,result)=>{
            conn.release();
            if( err ) {
                err.name = 'dbException';
                reject( err );
            } else {
                resolve( result.affectedRows );
            }
        });
    });
}

exports.getAllNews = (conn) => {
    let sql = "select * from news";
    return new promise((resolve, reject)=>{
        conn.query(sql,(err,rows)=>{
            conn.release();
            if( err ) {
                err.name = 'dbException';
                reject( err );
            } else {
                resolve( rows );
            }
        });
    });
}

exports.addNews = (conn,params) => {
    let sql = "insert into news values(default,?,?,now())";
    return new promise((resolve, reject)=>{
        conn.query(sql,params,(err,rows)=>{
            conn.release();
            if( err ) {
                err.name = 'dbException';
                reject( err );
            } else {
                resolve( rows );
            }
        });
    });
}

exports.getNewsById = (conn,nid) => {
    let sql = "select * from news where nid = ?";
    return new promise((resolve, reject)=>{
        conn.query(sql,[nid],(err,rows)=>{
            conn.release();
            if( err ) {
                err.name = 'dbException';
                reject( err );
            } else {
                resolve( rows[0] );
            }
        });
    });
}