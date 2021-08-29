const bcrypt = require('bcryptjs');
const {insertUser} = require('../model').uesrs;

module.exports = {
  post: (req, res => {
    const {email, password} = req.body;

    if (!email || !password) {
      res.status(400).send('Expected email and password to be present');
      return;
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          console.error(error);
          return;
        }
        inserUser(email, hash)
      });
    });

  });
}