const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema (
    {
    title: {
        required: true,
        type: String,
        minlength: 3,
        maxlength: 50,
        unique: true
    },
    status: {
        required: true,
        type: Boolean
    },
},{
toJSON:{
    transform: (des, ret, options) => {
    delete ret.__v
}
} 
})
module.exports = mongoose.model('todo', todoSchema)