var conn = require('../mysql/connect');

var category = {


    getAll: (callback)=>{
        return conn.query(`select * from categories`,callback);
    },

    store: function(data,callback){
        return conn.query(`insert into categories (name,status) values ('${data.name}','${data.status}')`,callback);
    },

    delete:function(id,callback){
        return conn.query(`delete from categories where id = ${id}`,callback);
    },

    getbyId:function(id,callback){
        return conn.query(`select * from categories where id = ${id}`,callback);
    },

    update: function(id,data,callback){
        return conn.query(`update categories set name = '${data.name}', status = '${data.status}' where id = ${id} `,callback);
    }

}

module.exports = category;