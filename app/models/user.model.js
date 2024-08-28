
const bcrypt = require('bcrypt');
var conn = require('../mysql/connect');

var user = {


    getAll: (callback)=>{
        return conn.query(`select * from users`,callback);
    },

    check_register: function (data, callback) {
        return conn.query(`insert into users (name,email,password) values ('${data.name}','${data.email}','${data.newpassword}')`, callback);
    },

    store: (data,callback)=>{
        return conn.query(`insert into users (name,email,password) values ('${data.name}','${data.email}','${data.nepassword}')`, callback);
    },

    getbyId: (id,callback)=>{
        return conn.query(`select * from users where id = ${id}`,callback);
    },

    update: (id,data,callback)=>{
        return conn.query(`update users set name = '${data.name}', email = '${data.email}', password = '${data.nepassword}' where id = ${id}`,callback);
    },


    delete: (id,callback)=>{
        return conn.query(`delete from users where id = ${id}`,callback);
    },

    check_login: (email, password, callback) => {
        var sql = "select * from users where email = '"+email+"'";
        conn.query(sql, (err, data) => {
            if (data[0]) {
                //login successfully
                bcrypt.compare(password, data[0].password, (err, result) => {
                    if (result) {
                        return callback(null, data[0]);
                    } else {
                        return callback(err, null);
                    }
                });
            } else {
                //login not found successfully
                let err = 'tài khoản hoặc mật khẩu không đúng';
                return callback(err, null);
            }
        });
    }
}

module.exports = user;

