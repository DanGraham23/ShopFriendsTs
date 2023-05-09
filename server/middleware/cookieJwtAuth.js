const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies.token;
    try{
        const user = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = user;
        next();
    }catch (err){
        res.clearCookie("token");
        return res.status(403).json({status:false});
    }
}