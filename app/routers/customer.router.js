

module.exports= function(router){

    var customercontroller =  require('../controllers/customer.controller');

    router.get('/home-login',customercontroller.login);
    router.post('/home-login',customercontroller.post_login);
    router.get('/home-register',customercontroller.register);
    router.post('/home-register',customercontroller.post_register);
    router.get('/home-logout',customercontroller.logout);
}