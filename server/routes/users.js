const express = require('express');
const router = express.Router();
const userQueries =  require('../database/queries/users')

// get all users
router.get('/', async (req, res, next) => {
  try {
    let users = await userQueries.getAllUsers();
    res.json({
      payload: users,
      message: 'retrieved all users.',
      err: false
    });
  } catch (err) {
    res.status(500).json({
      payload: null,
      message: 'failed retrieving users',
      err: true
    });
  }
});

// get user by id
router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    let user = await userQueries.getUserById(id);
    res.json({
      payload: user,
      message: 'retrieved user',
      err: false
    });
  } catch (err) {
    res.status(500).json({
      payload: null,
      message: 'failed retrieving user',
      err: true
    });
  }
})

// retrieve user by name
router.get('/:name', async (req, res, next) => {
  const name = req.params.name;
  try {
    let user = await userQueries.getUserByName(name);
    res.json({
      payload: user,
      message: 'retrieved user',
      err: false
    })
  } catch (err) {
    res.status(500).json({
      payload: null,
      message: 'failed retrieving user',
      err: true
    })
  }
})

router.post("/new", (req,res,next) => {
  userInfo = {
    email: req.body.email,
    password: req.body.password
  }
  try{
    let newUser = await userQueries.createNewUser(userInfo)
    res.json({
      payload: newUser,
      msg: "Success adding users",
      err: false
    })
  }catch(err){
    res.status(500).json({
      payload: null,
      message: 'failed retrieving user',
      err: true
    })
  }
})

module.exports = router;
