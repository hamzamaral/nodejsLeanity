const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
    const token = req.header("x-auth-token");
    if(!token) {
        return res.status(401).send("yetkiniz yok.");
    }

    try {
                console.log("decodedToken");
        const decodedToken = jwt.verify(token, "jwtPrivateKey");
        console.log(decodedToken);
        console.log("decodedToken");
        req.user = decodedToken;
        next();
    }
    catch(ex) {
    
        res.status(400).send("hatalı token2");
    }
}