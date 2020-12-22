/**
 * 
 * database setupe mongoodb
 * 
 * 
 */

 // --> setup dotenv 
 require('dotenv').config()

const mongoose = require('mongoose');
const { createConnection } = require('net');

mongoose.connect(process.env.DB_URI,{
   useNewUrlParser:true,
   useUnifiedTopology:true,
   useCreateIndex:true,
})
.then(()=> console.log('connect database'))
.catch((error)=> console.log(error));





/*
const dbString = 'mongodb://127.0.0.1:27017database'
const dbOptions = {

   useNewUrlParser:true,
   useUnifiedTopology:true,
   useCreateIndex:true,

}

const connection = createConnection(dbOptions,dbString)
.then(()=> console.log('connect database'))
.catch((error)=> console.log(error));
*/
/*mongoose.connect().then(()=> console.log('connect database'))
.catch((error)=> console.log(error));
*/