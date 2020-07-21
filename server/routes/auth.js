const express = require('express');
const router = express.Router();
const userQueries = require('../database/queries/users')
const helpers = require('../auth/helpers')
const passport = require('../auth/passport')
const { loginRequired } = require('../auth/helpers')

router.post("/signup", async (req, res, next) => {
  try {
    const passwordDigest = await helpers.hashPassword(req.body.password)

    const userInfo = {
      name: req.body.name,
      email: req.body.email,
      password: passwordDigest,
    }


    let newUser = await userQueries.createNewUser(userInfo)
    res.send({
      payload: newUser,
      msg: "New user created.",
      err: false
    })
  } catch (err) {
    next(err)
  }
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.json({
    payload: req.user,
    msg: "Successfully logged in",
    err: false
  })
})

router.post("/logout", loginRequired, (req, res, next) => {
  req.logout();
  res.status(200).send({ msg: "User logged out successfully" })
})

router.get("/isUserLoggedIn", (req, res, next) => {
  if (req.user) {
    res.json({user: req.user});
  } else {
    res.json({user: null});
  }
})


module.exports = router;