const httpstatus = require('../utils/httpstatus')
module.exports = (...role) => {
    return (req, res, next) => {
        if(!role.includes(req.deCodeToken.role)){
            return next(res.status(401).json({status: httpstatus.Error, data: {title: "This role is not authorized"}}))
        }
        next();
    }
}