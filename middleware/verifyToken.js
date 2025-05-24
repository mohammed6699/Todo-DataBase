// verify user (Authorization)
const jwt = require('jsonwebtoken');
const HTTPSTATUS = require('../utils/httpstatus')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    if(!authHeader){
       return res.status(402).json({status: HTTPSTATUS.ERROR, data: {title: "Token is Required"}})
    }
    const token = authHeader.split(' ')[1];
    try {
        const deCodeToken = jwt.verify(token, process.env.VERIFY_SIGNATURE);
        req.deCodeToken = deCodeToken
        console.log("token: ", deCodeToken)
        next()
    } catch (error) {
        return res.status(402).json({status: HTTPSTATUS.ERROR, data: {title: "Unothorized Token"}})
    }
};
module.exports = verifyToken;