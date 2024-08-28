const upload = require('../../upload-multer');
const authMinddleware = require('../auth/authMinddleware');

module.exports = function(router){
    var productcontroller = require('../controllers/product.controller');

    router.get('/',authMinddleware.checkAuth,productcontroller.home);
    
    router.get('/list-product',authMinddleware.checkAuth,productcontroller.list);
    router.get('/create-product',authMinddleware.checkAuth,productcontroller.create);
    router.post('/create-product/store',upload.single('image'),productcontroller.store);
    router.get('/edit-product:id',authMinddleware.checkAuth,productcontroller.edit);
    router.post('/edit-product:id',upload.single('image'),productcontroller.update);
    router.get('/delete-product:id',productcontroller.delete);
}