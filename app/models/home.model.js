var conn = require('../mysql/connect');

var product = {

    
    getbyId:function(id,callback){
        return conn.query(`select * from products where id = ${id}`,callback);
    }

    
}

module.exports = product;