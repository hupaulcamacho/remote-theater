const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { comparePasswords } = require('../auth/helpers');
const usersQueries = require('../database/queries/users');

passport.use(new LocalStrategy(async (email, password, done) => {
    console.log('auth user')
  try {
    const user = await usersQueries.getUserByEmail(email);
    if (!user) {
      return done(null, false)
    }

    const passMatch = await comparePasswords(password, users.password_digest);
    if (!passMatch) {
      return done(null, false)
    }

    delete user.password_digest; 
    done(null, user);

  } catch (err) {
    done(err)
  }
}))

passport.serializeUser((user, done) => {
    console.log('serialize user')
  done(null, user)
})

passport.deserializeUser(async (user, done) => {
    console.log('deserialize user')
  try {
    let retrievedUser = await usersQueries.getUserByEmail(users.email)
    delete retrievedUser.password_digest;
    done(null, retrievedUser)
  } catch (err) {
    done(err, false)
  }
})

module.exports = passport;