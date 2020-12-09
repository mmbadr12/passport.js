/**
 * 
 * --> router for passpor google rejester
 * 
 */

const router = require('express').Router();
const passport = require('passport');


router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res)=> {
      
    // Successful authentication, redirect home.
    res.redirect('/');
});


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