const { StreamChat } = require('stream-chat');
const express = require('express');
const router = express.Router();
const client = new StreamChat('', 'duwrgkezpn93tyzsq2uv5vj88uz6cu63dy675rxk4tb8pnvv7x7nhnv8ryvfq8mg');


router.post('/', async (req, res) => {
  try{
    let newToken = await client.createToken(req.body.user);
    console.log
    res.status(200).json({
      message: 'Created new token!!!',
      token: newToken,
      user: req.body.user
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



