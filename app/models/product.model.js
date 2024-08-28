var conn = require('../mysql/connect');

var product = {
    getAll: function(callback){
        return conn.query(`select * from products  order by id desc`,callback);
    },

    store: function(data,callback){
        return conn.query(`insert into products (name,image,price,sale_price,content,category_id,status) values ('${data.name}','${data.image}','${data.price}','${data.sale_price}','${data.content}','${data.category_id}','${data.status}')`,callback);
    },

    
    getbyId:function(id,callback){
        return conn.query(`select * from products where id = ${id}`,callback);
    },
    
    update: function(id,data,callback){
        return conn.query(`UPDATE products SET name = '${data.name}', image = '${data.image}', price = '${data.price}', sale_price = '${data.sale_price}', content = '${data.content}', category_id = '${data.category_id}', status = '${data.status}' where id = ${id} `,callback);
    },
    
    delete:function(id,callback){
        return conn.query(`delete from products where id = ${id}`,callback);
    },
}

module.exports = product;