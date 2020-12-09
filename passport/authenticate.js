/**
 * 
 * --> setup passport with google 
 * 
 */

if(require('dotenv').config() === 'development'){

  const passport = require('passport');
  const GoogleStrategy = require('passport-google-oauth20').Strategy;

//  passport.use("google", strategy);

passport.serializeUser(  (user, done)=> {done(null, user);});
  
passport.deserializeUser((user, done)=> {done(null, user);});

//User.findById(id, (err, user)=> { });  

passport.use(new GoogleStrategy({

   clientID:process.env.GOOGLE_CLIENT_ID,
   clientSecret:process.env.GOOGLE_CLIENT_SECRET,
   collbackURL:process.env.CALLBACK_URL

},(accessToken,refreshToken,profile,cb)=>{
  
   user.findOrcreate({googleId:profile.id}, (err,user)=>{
    
    console.log(profile)
    return cb(null,profile);

  })
  }
  ))
}




// .then((currentUser)=>{

//   if(currentUser){done(null,currentUser)}
  
//   else {

//   new user({googleId:profile.id})
//   .save()
//   .then((newUser)=>{ done( null, newUser )}) 

//   }
// })