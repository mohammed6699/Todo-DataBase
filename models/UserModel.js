const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const validator = require('validator');
const UserRole = require('../utils/UserRole')
const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
            unique: true
        },
        FirstName: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 10,
        },
        LastName: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 10,
        },
        password: {
            type: String,
            minlength:3,
            maxlength:15,
            required: true,
            validate: [validator.isStrongPassword, "Invalid Password"]
        },
        email:{
            type: String,
            required: true,
            unique: true,
            validate: [validator.isEmail, "Invalid Email address"],
        },
        token: {
            type: String
        },
        role: {
            type: String,
            enum: [UserRole.ADMIN, UserRole.USER],
            default: UserRole.USER
        },
        avatar: {
            type: String,
        }
    },{
        // using the toJson function to hide the password before sending it
        toJSON:{
            transform: (doc, ret, options) => {
                delete ret.password;
                delete ret.__v
            }
        }
    }
)
// all this mean before you save the password replace the userPassword with the new one (hased)
userSchema.pre('save', function() {
    const hash = bcrypt.hashSync(this.password, 8)
    this.password = hash
})

module.exports = mongoose.model('User', userSchema)