const conn = require('../mysql/connect');
const bcrypt = require('bcrypt');



var customer = {

    check_register:(data,callback)=>{
        return conn.query(`insert into customers (name,email,password) values ('${data.name}','${data.email}','${data.newpassword}')`,callback);
    },

    check_login: (email, password, callback) => {
        var sql = "select * from customers where email = '"+email+"' and password = '"+password+"'";
        conn.query(sql, (err, data) => {
            if (data[0]) {
                //login successfully
                return callback(err, data[0]);
            } else {
                //login not found successfully
                let err = 'tài khoản hoặc mật khẩu không đúng';
                return callback(err, null);
            }
        });
    }

}

module.exports = customer;