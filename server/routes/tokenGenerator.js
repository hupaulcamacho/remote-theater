const { StreamChat } = require('stream-chat');
const express = require('express');
const router = express.Router();

const client = new StreamChat('', 'esc44v2uhamvhde5gk4b2nqywj6fxaqekfym93pskenzwhx6hngqav7s6hwmende');



router.post('/', async (req, res) => {
  
  let user = req.body
  console.log(user)
  try{
    let newToken = await client.createToken(user.name);
    console.log(newToken)
    res.status(200).json({
      message: 'Created new token!!!',
      token: newToken,
      user: user
    });
  }
  catch(err){
    console.log(err);
    res.json({
      err: err
    });
  }
});


module.exports = router;



