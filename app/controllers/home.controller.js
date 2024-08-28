
var category = require('../models/category.model');
const util = require('util');
var conn = require('../mysql/connect');

var homecontroller = {

    cateogry: (req,res)=>{
        category.getAll(function(err,result){
            if(err){
                res.send(err);
            } else{
                res.render('home/home',{cate:result});
            }
        });
    },


    home: function(req,res){
        let sql = 'select * from products order by id desc';
        let _key = req.query.key;
        if(_key){
            sql += " where name LIKE '%"+_key+"%'";
        }
            conn.query(sql,(err,result)=>{
                if(err){
                    res.send(err);
                }else{
                    res.render('home/home',{pro:result});
                }
            });
    },


    detail: (req,res)=>{
        const query = util.promisify(conn.query).bind(conn);
        var product;
        (async ()=>{
            try{
            product = await query('select * from products where id ='+req.params.id);
            const lstpro = await query('select * from products');
            res.render('home/detail',{pro:product[0],lsdpro:lstpro});
            }finally{
                
            }
        })();
    },

    contact: function(req,res){
        res.render('home/contact');
    },

    about: function(req,res){
        res.render('home/aboutpage');
    }
    
}

module.exports = homecontroller;