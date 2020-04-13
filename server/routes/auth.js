const express = require('express');
const router = express.Router();
const userQueries =  require('../database/queries/users')
const helpers = require('../auth/helpers')
const passport = require('../auth/passport')

router.post("/signup", async (req,res,next) => {
    try{
      const passwordDigest = await helpers.hashPassword(req.body.password)
  
      const userInfo = {
        name: req.body.name,
        email: req.body.email,
        password: passwordDigest,
      }
  
      let newUser = await userQueries.createNewUser(userInfo)
      res.json({
        payload: newUser,
        msg: "Success adding users",
        err: false
      })
    }catch(err){
      console.log(err)
      res.status(500).json({
        payload: null,
        message: 'failed adding user',
        err: true
      })
    }
  })

  router.post('/login', passport.authenticate('local'),(req, res, next) => { 
    res.json({
      payload: req.user,
      msg: "Successfully logged in",
      err: false
    })
  })

  router.get("/logout", (req, res, next) => {
    res.send('/logout route')
  
  })

module.exports = router;