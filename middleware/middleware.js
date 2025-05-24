const {body} = require('express-validator')
const vallidationSchema = () => {
     body('title')
     .notEmpty()
     .isLength({min: 5})
     .withMessage("Titke must be exists and at least 5 words")
}
module.exports = {
    vallidationSchema
}