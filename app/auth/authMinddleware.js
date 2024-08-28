var authMinddleware = {
    checkAuth: (req, res, next) => {
        if (req.session.login) {
            res.locals.login = req.session.login;
            next();
        } else {
            res.redirect('/admin-login');
        }
    }
}

module.exports = authMinddleware;