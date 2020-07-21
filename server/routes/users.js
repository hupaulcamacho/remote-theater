const express = require('express');
const router = express.Router();
const userQueries =  require('../database/queries/users');
const { loginRequired } = require('../auth/helpers')


// get all users
router.get('/', /*loginRequired,*/ async (req, res, next) => {
  // console.log(req.session)
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
router.get('/:id',loginRequired, async (req, res, next) => {
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

// retrieve user by email
router.get('/email/:email', /*loginRequired,*/  async (req, res, next) => {
  const email = req.params.email;

  try {
    let user = await userQueries.getUserByEmail(email);
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



module.exports = router;
