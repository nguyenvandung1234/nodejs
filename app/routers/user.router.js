const authMinddleware = require('../auth/authMinddleware');

module.exports = function(acount){

    var accountController = require('../controllers/user.controller');

    acount.get('/admin-login',accountController.login);
    acount.post('/admin-login',accountController.post_login);
    acount.get('/admin-register',accountController.register);
    acount.post('/admin-register',accountController.post_register);
    acount.get('/admin-logout',accountController.logout);

    //user
    acount.get('/list-user',authMinddleware.checkAuth,accountController.user);
    acount.get('/create-user',authMinddleware.checkAuth,accountController.create);
    acount.post('/create-user/store',authMinddleware.checkAuth,accountController.store);
    acount.get('/edit-user:id',authMinddleware.checkAuth,accountController.edit);
    acount.post('/edit-user:id',authMinddleware.checkAuth,accountController.update);
    acount.get('/delete-user:id',authMinddleware.checkAuth,accountController.delete);
}