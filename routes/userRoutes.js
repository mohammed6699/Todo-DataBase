const express = require('express')
const router = express.Router();
const HTTPSTATUS = require('../utils/httpstatus')

const multer = require('multer');
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads');
    },
    filename: function(req, file, cb){
        const ext = file.mimetype.split('/')[1]
        const fileName = `user-${Date.now()}.${ext}`;
        cb(null, fileName)
    }
})
const fileType = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedMimeTypes.includes(file.mimetype)){
        return cb(null, true)
    }else{
        return cb(new Error('Only .jpg, .jpeg, and .png files are allowed!'), false)
    }
}
const upload = multer({storage: diskStorage, 
    fileFilter: fileType
})
const userControllers = require('../contollers/userControllers');
const verifyToken = require('../middleware/verifyToken')
// get all users
router.route('/')
            .get(verifyToken, userControllers.getAllUsers)
// register
router.route('/register')
            .post(upload.single('avatar'), userControllers.registerUsers)
// login
router.route('/login')
            .post(userControllers.login)

module.exports = router;