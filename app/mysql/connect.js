var mysql = require('mysql');
const session = require('express-session');


var conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'mydata'
});


module.exports =  conn;