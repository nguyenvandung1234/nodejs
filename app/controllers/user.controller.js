
const Joi = require('joi');
var user = require('../models/user.model');
var bcrypt = require('bcrypt');

var accountcontroller = {

    login: (req, res) => {
        res.render('admin/login');
    },


    post_login: (req, res) => {
        user.check_login(req.body.email, req.body.password, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                req.session.login = data;
                return res.redirect('/');
            }
        })
    },

    register: (req, res) => {
        res.render('admin/register');
    },


    post_register: (req, res) => {
        const Shema = Joi.object().keys({
            name: Joi.string().required().messages({'string.empty':'name cannot be empty'}),
            email: Joi.string().email().required().messages({'string.empty':'email cannot be empty','string.email':'email không đúng định dạng'}),
            password: Joi.string().required().messages({'string.empty':'password cannot be empty'})
        });
        const {error}  = Shema.validate(req.body);
        if(error){
            res.render('admin/register',{err:error.details});
        }else{
            bcrypt.hash(req.body.password,parseInt(10)).then((newpassword)=>{
                var name= req.body.name;
                var email = req.body.email;
                user.check_register(({name,email,newpassword}),(err,result)=>{
                    if(err){
                        res.send(err);
                    }else{
                        res.redirect('/admin-login');
                    }
                });
            })
        }
      
    },

    user: (req, res) => {
        user.getAll((err,result)=>{
            if(err){
                re.send(err);
            }else{
                res.render('user/list',{user:result});
            }
        });
    },


    create: (req,res)=>{
        res.render('user/create');
    },

    store: (req,res)=>{
        bcrypt.hash(req.body.password,parseInt(10)).then((nepassword)=>{
            var name= req.body.name;
            var email = req.body.email;
            user.store(({name,email,nepassword}),(err,result)=>{
                if(err){
                    res.send(err);
                }else{
                    res.redirect('/list-user');
                }
            });
        });
    },

    edit: (req,res)=>{
        let id = req.params.id;
        user.getbyId(id,(err,result)=>{
            if(err){
                res.send(err);
            }else{
                res.render('user/edit',{user:result[0]});
            }
        });
    },

    update: (req,res)=>{
        let id = req.params.id;
        bcrypt.hash(req.body.password,parseInt(10)).then((nepassword)=>{
            var name= req.body.name;
            var email = req.body.email;
            user.update(id,({name,email,nepassword}),(err,result)=>{
                if(err){
                    res.send(err);
                }else{
                    res.redirect('/list-user');
                }
            });
        });
    },

    delete:(req,res)=>{
        let id = req.params.id;
        user.delete(id,(err,result)=>{
            if(err){
                res.send(err);
            }else{
                res.redirect('/list-user');
            }
        })

    },

    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/admin-login');
    },

   


}

module.exports = accountcontroller;