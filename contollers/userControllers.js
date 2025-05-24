require('dotenv').config()
const User = require('../models/UserModel')
const HTTPSTATUS = require('../utils/httpstatus')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const getAllUsers = async(req, res) => {
    // user pagination
    const query = req.query;
    const limit = query.limit;
    const page = query.page;
    const end = (page - 1) * limit;
    const getAllUsers = await User.find().limit(limit).skip(end);
    res.status(201).json({status : HTTPSTATUS.SUCCESS, data: {getAllUsers}});
}
// add users
const registerUsers = async(req, res) => {
    const {userName, FirstName, LastName, password, email, role, avatar} = req.body
   const user = await User.findOne({userName})
   if(user){
     return res.status(400).json({status: HTTPSTATUS.FAIL, data: {title: "email alrady exists"}})
   }
   const newUser = new User({
        userName,
        FirstName,
        LastName,
        password,
        email,
        role,
        avatar: req.file.filename
   })

   // generate jwt token
    const token = await jwt.sign({email: newUser.email, id: newUser._id, role: newUser.role}, process.env.VERIFY_SIGNATURE, {expiresIn: "10minutes"});
    newUser.token = token;
    await newUser.save();
    res.json({status: HTTPSTATUS.SUCCESS, data: {newUser}})
}
// check user exists id exists loged him if not create it (authontication)
const login = async(req, res) => {
   const {email, password} = req.body;
     const user = await User.findOne({email})     
     if(!user){
        return res.status(400).json({status: HTTPSTATUS.FAIL, data: {title: "AUthentication Error"}})
     }
    const pass = await bcrypt.compare(password, user.password)
    if(!pass){
        return res.status(404).json({status: HTTPSTATUS.FAIL, data: {title: "Authentication Errors"}})
    }
    // generate JWT
    const token = await jwt.sign({email: user.email, id: user._id, role: user.role}, process.env.VERIFY_SIGNATURE, {expiresIn: "10minutes"});
    user.token = token
    res.status(201).json({status: HTTPSTATUS.SUCCESS, data: {token}})
}

module.exports = {
    getAllUsers,
    registerUsers,
    login,
}