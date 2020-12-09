const {check} = require('express-validator');

const valid =[

check('firstname').isLength({max:100}).withMessage('valid firstname'),

check('lastname').isLength({max:100}).withMessage('valid lastname'),  

check('email').isEmail().isLength({max:255}).trim().withMessage('valid email'),

check('password1').isLength({min:8}).withMessage('valid password'),

check('password2').isLength({min:8}).withMessage('valid password '),

]

module.exports = valid;
