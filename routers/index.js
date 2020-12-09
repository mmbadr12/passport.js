const express = require('express');
const router = express.Router();
const { UserSchema,joiValidatore }  = require('../models/user.schema');
const flash = require('connect-flash');
const valid = require('../middleware/valid.user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const  _ = require('lodash');



router.get('/' , (req,res)=>{

   res.render('index/index' ,{message : req.flash('info')})

});


router.get('/register'  , (req,res)=>{

    res.render('users/register' ,{errors: req.flash('errors')});
    
});
    




router.post('/register' ,valid, async(req,res) => {

  const errors = await validationResult(req)
  if( !errors.isEmpty()){

      res.redirect('/register');
      req.flash('errors',errors.array());

      console.log('ok');
  
}else{

  let user = await  UserSchema.findOne({
       firstname:req.body.firstname,
       lastname:req.body.lastname,
       email:req.body.email,
       password1:req.body.password1,
       password2:req.body.password2,
       token:req.body.token
    })

    user = new UserSchema(_.pick(req.body,['email','password1', 'password2', 'firstname' , 'lastname']))
   
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    user.password1 = await bcrypt.hash(user.password1, salt);
    user.password2 = await bcrypt.hash(user.password2, salt);
   
    user.save((error) => { 
     
      if (!error) {
          
       console.log('connect'); 
       
       res.redirect('/');
       req.flash('info', 'register seccussfuly');

      }else{
     
             console.log(error.message);
         }
     
      });


  
  res.render({errorss});
}
});






// router.get('/coop' , (req,res)=>{

//  res.render('style/coop')

// });


  module.exports = router;





   
//  let errorss = []

//  if(!password1 || !peassword2 || !email || !firstname || !lastname){

//    errorss.push({ msg:'must be fill in all filld'});

//  }

//  if (password1 !== password2) {

//    errorss.push({ msg:'password do not match' });

//  }

//  if (password.langth > 6) {

//    errorss.push({ msg:'password must be 8 cher at lest' });
   
//  }