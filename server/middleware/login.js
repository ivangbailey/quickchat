const {newClient} = require('../../db/database.js')

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    newClient.connect(client => {
      client.query('SELECT * FROM users WHERE user = $1', [username])
        .then(results => {
          console.log(results);
          if (!results.length) {
            return done(null, false, {message: 'Unable to find your username'});
          }
          const [user] = results;
          if (!password === user.password) {
            return done(null, false, {message: 'The supplied password is incorrect'});
          }
          return done(null, user);
        })
    })
    .error(done);
  }
));

module.exports = {
  passport
}