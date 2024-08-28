module.exports = function(router){
    
    var homecontroller = require('../controllers/home.controller');

    router.get('/home',homecontroller.home);
    router.get('/home',homecontroller.cateogry);
    router.get('/detail:id',homecontroller.detail);
    router.get('/contact',homecontroller.contact);
    router.get('/about',homecontroller.about);
}