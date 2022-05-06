var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
const users = require('../data/users');
var router = express.Router();

passport.use(new LocalStrategy(function verify(email, password, callback) {
  const loggedInUser = users.find(u => u.email === email && u.password === password);
  console.log(loggedInUser, email, password);
    if(!loggedInUser)
    {
        // sai username+password
      return callback(null, false, { message: 'Incorrect username or password.' });
    }
    console.log('Chạy được ko?');
    // dung username+password 
    return callback(null, loggedInUser);
    console.log('Chạy được ko?');
}));

// router.post('/login', passport.authenticate('local', {
//   successRedirect: '/landingPage',
//   failureRedirect: '/'
// }));

router.post('/login', passport.authenticate('local', {
  successRedirect: '/landingPage',
  failureRedirect: '/'
}));


router.post('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
