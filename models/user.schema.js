const mongoose = require('mongoose');
const joi = require('joi');

const SchemaUser = new mongoose.Schema({

  firstname:{ type:String, maxlength:100, required:true },

  lastname:{ type:String, maxlength:100,required:true },

  email:{ type:String, unique:1, maxlength:255, trim:true, required:true },

  password1:{ type:String, minlength:8, maxlength:150, required:true }, 

  password2:{ type:String, minlength:8, maxlength:150, required:true },

  token:{ type:String },

});

const UserSchema = mongoose.model('UserSchema' , SchemaUser);


function  joiValidatore(user) {

    const schemaJoi = joi.object({

        firstname:joi.string().max(100).required(),
        lastname:joi.string().max(100).required(),
        email:joi.string().max(255).trim().required().email(),
        password1:joi.string().min(8).required(),
        password2:joi.string().min(8).required(),

    })
  return schemaJoi.validate(joi,user);   
}




module.exports = { UserSchema , joiValidatore };



