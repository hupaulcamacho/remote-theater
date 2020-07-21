const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { comparePasswords } = require('../auth/helpers');
const usersQueries = require('../database/queries/users');


passport.use(new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
  try {
    const user = await usersQueries.getUserByEmail(email);
    if (!user) {
      return done(null, false)
    }

    const passMatch = await comparePasswords(password, user.password);
    if (!passMatch) {
      return done(null, false)
    }

    delete user.password; 
    done(null, user);

  } catch (err) {
    console.log(err)
  }
}))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser(async (user, done) => {
  try {
    let retrievedUser = await usersQueries.getUserByEmail(user.email)
    delete retrievedUser.password;
    done(null, retrievedUser)
  } catch (err) {
    done(err, false)
  }
})

module.exports = passport;

