const jwt = require("jsonwebtoken")
const config = require("../config")
function auth(req, res, next) {
    try {

        const token = req.cookies.token
        if (!token)
            return res.status(401).json({errorType: "unauthorized"});
        
        const verified = jwt.verify(token, config.SECRET)
        req.user = verified.user

        next()

    } catch (err) {
        console.error(err)
        res.status(401).json({
            errorType: "unauthorized"
        });
    }

}
module.exports = auth;