const authMinddleware = require('../auth/authMinddleware');

module.exports = function(router){
    var categoryController = require('../controllers/category.controller');
    router.get('/list-category',authMinddleware.checkAuth,categoryController.list);
    //add category
    router.get('/create-category',authMinddleware.checkAuth,categoryController.create);
    router.post('/create-category/store',categoryController.store);
    router.get('/edit-category:id',authMinddleware.checkAuth,categoryController.edit);
    router.post('/update-category:id',categoryController.update);
    router.get('/delete-category:id',categoryController.delete);
    //end add category
}

