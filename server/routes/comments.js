var express = require ('express')
var router = express.Router()
const db = require ('../database/db.js')

//get all comments
router.get('/', async (req, res) => {
    try {
        let allComments = await db.any('SELECT * FROM comments;')
        res.json({
            body: allComments
        })
    } catch (error) {
        res.json({
            error: error
        })
    }
})

//get comments by user id
router.get('/:users_id', async (req, res) => {
    try {
        let commentByUserID = await db.any(`SELECT * FROM comments WHERE users_id = '${req.params.users_id}' `)
        res.json({
            payload: commentByUserID,
            message:"got all comments by users id"
        })
    }catch (err){
        console.log(err)
        res.json({
            error:err
        })
    }
})

    // get comments by video id 
    router.get('/video/:video_id', async (req, res) => {
        try {
            let commentByVideoID = await db.any(`SELECT * FROM comments WHERE video_id = '${req.params.video_id}' `)
            res.json({
                payload: commentByVideoID,
                message:"got all comments by video id"
            })
        }catch (err){
            console.log(err)
            res.json({
                error:err
            })
        }
    });

        //post a new comment
router.post('/video/:video_id', async (req, res) => {
    try {
        await db.none(`INSERT INTO comments(users_id, comment_body) VALUES(${req.body.users_id}, ${req.body.comment_body})`)
        res.json({ message: "comment added"})
    }catch(err) {
        console.log("err", err)
        res.json({error: err})
    }
});

//Delete comment
router.delete('/', async (req, res) => {
    console.log(req.body);
    try {
      let comment_id = req.body.comment_id;
      let comment_body = req.body.comment_body;
  
      let insertQuery = `
        DELETE FROM comments
        WHERE comment_id= $1 AND comment_body = $2`;
      await db.none(insertQuery, [comment_id, comment_body]);
      console.log(req.body);
      res.json({
        status: "success",
        message: `Delete Success`,
        body: req.body
      });
    } catch (error) {
      console.log(error);
      res.status(500);
      res.json({
        message: "Error. Something went wrong"
      });
    }
  });


module.exports = router;

// GET: get all comments by user id
// GET: get all comments by video id
// POST: new comment
// DELETE: delete comment
