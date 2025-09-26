module.exports = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();//Bu satır, üretilen güvenlik kodunu şablonlarda csrfToken adıyla kullanabilmek için res.locals objesine atar.
    next();
}