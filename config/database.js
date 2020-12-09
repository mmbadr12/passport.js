/**
 * database setupe mongoodb
 */
if(process.env.NODE_ENV !== 'productioon'){

   require('dotenv').config()

}
 

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI,{

   useNewUrlParser:true,
   useUnifiedTopology:true,
   useCreateIndex:true,

}).then(()=> console.log('connect database'))
.catch((error)=> console.log(error));
