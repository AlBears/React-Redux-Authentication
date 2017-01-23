const User = require('../models/user');

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  /* See if the user with given name exists */
  User.findOne({ email }, function(err, existingUser) {
    if (err) { return next(err); }
  /* If the user EXISTS return an error */
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }
  /* If the user does NOT exist create new user */
    const user = new User({
      email,
      password
    });
    user.save(function(err) {
      if (err) { return next(err); }
  /* Respond to request that user was created */
      res.json(user);
    });
  });
}
