const customer = require('../models/customer.model');
const bcrypt = require('bcrypt');
const conn = require('../mysql/connect');



var customercontroller = {

    login: (req,res)=>{
        res.render('home/login');
    },


    post_login: (req, res) => {
        customer.check_login(req.body.email, req.body.password, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                req.session.login = data;
                return res.redirect('/home');
            }
        })
    },

    register: (req,res)=>{
        res.render('home/register');
    },

    post_register: (req,res)=>{
        bcrypt.hash(req.body.password,parseInt(10)).then((newpassword)=>{
            var name = req.body.name;
            var email = req. body.email;

            customer.check_register(({name,email,newpassword}),(err, result)=>{
                if(err){
                    res.send(err);
                }else{
                    res.redirect('/home-login');
                }
            });
        });
    },

    logout: (req,res)=>{
        req.session.destroy();
        res.redirect('/home-login');
    }
}

module.exports = customercontroller;