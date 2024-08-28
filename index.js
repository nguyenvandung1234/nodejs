const express = require('express');
const app = new express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mydata'
});

conn.connect(function(err){
    if(err) throw err;
    console.log('connection successfully');
});



app.get('/sanpham',(req,res)=>{
    var sql = `select * from categories`;
    conn.query(sql,(err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.end(JSON.stringify(result));
        }
    });
});

app.get('/sanpham/:id',(req,res)=>{
    let id = req.params.id;
    var sql = `select * from categories where id = ${id}`;
    conn.query(sql,(err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.end(JSON.stringify(result));
        }
    });
});


app.post('/themsanpham',(req,res)=>{
    var bodyData = req.body;
    let sql = `insert into categories set ?`;
    conn.query(sql,bodyData,(err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.end(JSON.stringify('add successfully'));
        }
    });
});

app.put('/suasanpham',(req,res)=>{
    var bodyData = [req.body.name,req.body.status,req.body.id];
    var sql = `update categories set name = ?, status = ? where id = ?`;
    conn.query(sql,bodyData,(err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.end(JSON.stringify('update successfully'));
        }
    });
});



app.get('/delete',(req,res)=>{
    let id = [req.body.id];
    var sql = `delete from categories where id = ?`;
    conn.query(sql,id,(err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.end(JSON.stringify('delete successfully'));
        }
    });
});




var server = app.listen(3000,'127.0.0.1',function(){
    const host = server.address().address;
    const port = server.address().port;
    console.log('server listening runningg http://localhost:3000');
});