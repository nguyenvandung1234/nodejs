const Joi = require('joi');
var category = require('../models/category.model');
var conn = require('../mysql/connect');



var categorycontroller = {
    list: function (req, res) {

        let sql = `select * from categories`;
        let _key = req.query.key;
        if (_key) {
            sql += " where name LIKE '%"+_key+"%'";
        }
        sql += ` order by id desc`;
        conn.query(sql, (err,result)=>{
            res.render('category/list', { cate: result });
        });
        
    },
    //add category
    create: function (req, res) {
        res.render('category/create');
    },
    //end add category

    //create category
    store: function (req, res) {
        category.store(req.body, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.redirect('/list-category');
            }
        });
    },
    //end create category

    //delete category
    delete: function (req, res) {
        let id = req.params.id;
        category.delete(id, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.redirect('/list-category');
            }
        });
    },
    //end delete category

    //edit category
    edit: function (req, res) {
        let id = req.params.id;
        category.getbyId(id, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.render('category/edit', { cate: result[0] });
            }
        });
    },
    //end edit category

    //update category
    update: function (req, res) {
        let id = req.params.id;
        category.update(id, req.body, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.redirect('/list-category');
            }
        });
    },


}

module.exports = categorycontroller;