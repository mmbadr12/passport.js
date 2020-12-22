/**
 * 
 * --> router for passpor google rejester
 * 
 */

const router = require('express').Router();
const passport = require('passport');


// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.user) {
      next();
  } else {
      res.sendStatus(401);
  }
}

// Example protected and unprotected routes
router.get('/rejester', (req, res) => res.render('passport/index'))
router.get('/failed', (req, res) => res.send('You Failed to log in!'))


// In this route you can see that if the user is logged in u can acess his info in: req.user
router.get('/good', isLoggedIn, (req, res) =>{
  res.render("passport/profile",{name:req.user.displayName,pic:req.user.photos[0].value,email:req.user.emails[0].value})
})


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/good');
}
);

router.post('/login', passport.authenticate('local-login', {
    sucecssRedirect: '/', // <== TYPO (successRedirect)
    failureRedirect: '/login',
    failureFlash: true
}));





//Logout
router.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
})


  module.exports = router;