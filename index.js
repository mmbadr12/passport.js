/**                   --> comment Important tddoo <--
 * 
 * --> npm install --save-dev babel-cli babel-preset-env jest supertest superagent --> for test 
 * --> moust add page .env it's very Important TDDOO that's all keys ther...
 * --> for dawonloads all library for testing
 * --> use dotenv for enverment
 * --> npm install or npm i
 * --> npm run start or npm start
 * 
 */

 // --> this library is very Important for -> SECRET KEYS <-
  require('dotenv').config();

const express = require('express');
const bodyParse = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
//const session = require('express-session');
const path = require('path');
const logger = require('morgan');
const flash = require('connect-flash');
const DB = require('./config/database');
const passport = require('passport');
const keys = require('./keys/key');

const app = express();

// --> router path for index page and passport rejester
const indexRoutere = require('./routers/index');
const passportRouter = require('./routers/passport');

// --> views setup end use fromwork engine ejs
app.set('views' , path.join(__dirname , 'views'));
app.set('view engine' , 'ejs');

app.use(logger('dev'));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: false}));
app.use(cookieParser());

// --> setup public for css & javascrept & images <--file 
app.use(express.static(path.join(__dirname , 'public'))); 
// app.use(session({
//   secret:'milan ',
//   resave:true,
//   saveUninitialized:true,
//   cookie:{maxAge:60000*15}
// }));

// ---> cookie session setup
app.use(cookieSession({
  secret:process.env.SECRET_SESSION,
  keys:process.env.KEY_SESSION,
  maxAge: process.env.MAXAGE,
  resave:true,
  saveUninitialized:true,
  name: 'milan',
}));

// ---> setup flash for alert message
app.use(flash());

// ---> passport initialize and session view for the app 
app.use(passport.initialize());
app.use(passport.session());

require('./passport/authenticate.js')

// ---> path index and passport page: 
app.use('/' , indexRoutere);
app.use('/' , passportRouter);



// ---> app listen with port enviroment:
const PORT  = process.env.PORT || 7000;
app.listen(PORT, ()=>{
  
  console.log(`>-- conect index page --> http://localhost:${PORT}`);

  console.log(`>-- rejester page --> http://localhost:${PORT}/rejester`);

});

module.exports = app;



