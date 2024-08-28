const express =require('express');
const app = express();
app.set('view engine','ejs');
const mysql = require('mysql');
const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
const joi =require('joi');
const multer = require('multer');

const session = require('express-session');
var server = require('http').createServer(app);
io = require('socket.io')(server);
var path = require('path');
app.use(express.static(path.join(__dirname,'/public')));



app.use(session({
    secret: 'dung123',
    resave: true,
    saveUninitialized:false
}));


var conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'mydata'
});


















//chat
app.get('/send',function(req,res){
    res.sendFile(__dirname  + '/chat.html');
});

io.on('connection',(socket)=>{
    socket.on("user_chat",(data)=>{
        console.log(data);
        io.emit("server_chat",data);
    });
});
// end chat






require('./app/routers/category.router')(app);
require('./app/routers/product.router')(app);
require('./app/routers/home.router')(app);
require('./app/routers/user.router')(app);
require('./app/routers/customer.router')(app);

// app.use((req,res,next)=>{
//     res.locals.login = req.session.login;
//     next();
// });


app.listen(3000,function(){
    console.log('serve running on http://localhost:3000');
});


