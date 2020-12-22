/**
 * 
 * --> setup passport with google 
 * 
 */

  const passport = require('passport');
  const GoogleStrategy = require('passport-google-oauth20').Strategy;

//  passport.use("google", strategy);


passport.serializeUser(function(user, done) {
  /*
  From the user take just the id (to minimize the cookie size) and just pass the id of the user
  to the done callback
  PS: You dont have to do it like this its just usually done like this
  */
  done(null, user);
});
  
passport.deserializeUser(function(user, done) {
  /*
  Instead of user this function usually recives the id 
  then you use the id to select the user from the db and pass the user obj to the done callback
  PS: You can later access this data in any routes in: req.user
  */
  done(null, user);
});



passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
function(accessToken, refreshToken, profile, cb) {
  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return cb(err, user);

  }).then((currentUser)=>{
     
      if(currentUser){
        done(null,currentUser)
      
      } else {
     
       new user({googleId:profile.id})
        .save()
        .then((newUser)=>{ done( null, newUser )}) 

      }
  })
}
));

 




 