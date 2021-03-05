const router = require("express").Router();
const User = require('../../models/User.model');
const bcrypt = require('bcrypt');
const passport = require('passport')


router.post('/signup', (req, res, next) => { // "/" = "/api/auth"
  const { username, password, userType } = req.body;
  if (password.length < 8) {
    return res.status(400).json({ message: 'Your password must be 8 chars minimum' });
  }
  if (username === '') {
    return res.status(400).json({ message: 'Your username cannot be empty' });
  }
  if (userType === '') {
    return res.status(400).json({message: 'Please enter your user type'})
  }
  // check if username exists in database -> show message
  User.findOne({ username: username })
    .then(found => {
      if (found !== null) {
        return res.status(400).json({ message: 'Your username is already taken' });
      } else {
        // hash the password, create the user and send the user to the client
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);
        console.log(userType)
        User.create({
          username: username,
          password: hash,
          userType: userType
        })
          .then(dbUser => {
            // login with passport:
            req.login(dbUser, err => {
              if (err) {
                return res.status(500).json({ message: 'Error while attempting to login' })
              }
              // we don't redirect to an html page anymore, we just send the user obj to the client
              return res.status(200).json(dbUser);
            });
          })
          .catch(err => {
            res.json(err);
          })
      }
    })
});

router.post('/login', (req, res, next) => { // "/" = "/api/auth"
  console.log(req.body);
  passport.authenticate('local', (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Error while attempting to login' })
    }
    if (!user) {
      return res.status(401).json({ message: 'Wrong credentials' })
    }
    req.login(user, err => {
      if (err) {
        return res.status(500).json({ message: 'Error while attempting to login' })
      }
      return res.status(200).json(user);
    })
  })(req, res, next);
});
 
router.delete('/logout', (req, res) => { // "/" = "/api/auth"
  // passport method to log out
  req.logout();
  res.status(200).json({ message: 'Sucessful logout' });
})

router.get('/loggedin', (req, res, next) => { // "/" = "/api/auth"
  // this is where passport stores the logged in user
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  }
  res.status(403).json({message: "Unauthorized"});
});


module.exports = router;