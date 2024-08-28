var product = require('../models/product.model');
var category = require('../models/category.model');
const conn = require('../mysql/connect');
const util = require('node:util');
const query = util.promisify(conn.query).bind(conn);
const Joi = require('joi');

var productcontroller = {


    home: function (req, res) {
        res.render('admin/home');
    },


    list: async function (req, res) {
        let _key = req.query.key;

        //láy trang hiện tại:1,2,3
        let _page = req.query.page ? req.query.page : 1;

        //tổng số dòng trong bảng
        var sql_total  = `select count(*) as total from products`;
        
        if(_key){
            sql_total += " where name LIKE '%"+_key+"%'";
        }
        
        let rowData = await query(sql_total);

        let totalRow = rowData[0].total;

        //số lượng in ra
        let _limit = 6;

        let totalPage = Math.ceil(totalRow / _limit);

        _page = _page > 0 ? Math.floor(_page) : 1;

        _page = _page <= totalPage ? Math.floor(_page) : totalPage;

        let _start = (_page - 1) * _limit;

        let sql = `select * from products `;
        if(_key){
            sql += " where name LIKE '%"+_key+"%'";
        }
        sql += " order by id desc limit " + _start + "," + _limit;
        conn.query(sql,(err,result)=>{
            if(err){
                res.send(err);
            }else{
                res.render('product/list', { pro: result, totalPage : totalPage, _page:parseInt(_page), _key: _key });
            }
        })
    },

    //add product
    create: function (req, res) {
        category.getAll((err, result) => {
                if (err) {
                    res.rend(err);
                } else {
                    res.render('product/create', { cate: result });
                }
        });
    },
    //end add product

    store: function (req, res) {
        var bodyData = req.body;
        bodyData.image = req.file.filename;
        product.store(bodyData, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.redirect('/list-product');
            }
        });
    },

    //edit product
    edit: function (req, res) {
        let id = req.params.id;
        product.getbyId(id, function (err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.render('product/edit', { pro: result[0] });
                }
        });
    },
    //end edit product

    //update product
    update: function (req, res) {
        let id = req.params.id;
        var bodyData = req.body;
        if (req.file) {
            bodyData.image = req.file.filename;
        }
        // console.log(bodyData);
        product.update(id, bodyData, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.redirect('/list-product');
            }
        });
    },
    //end update product

    //delete product
    delete: function (req, res) {
        let id = req.params.id;
        product.delete(id, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.redirect('list-product');
            }
        })
    }
    //end delete product
}

module.exports = productcontroller;