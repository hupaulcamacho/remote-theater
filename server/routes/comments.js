var express = require ('express')
var router = express.Router()
const comment = require('../database/queries/comment')


//get all comments
router.get('/', async (req, res) => {
    try {
        let allComments = await comment.getAllComments()
        res.json({
            payload: allComments,
            msg: 'success',
            err: false
        })
    } catch (error) {
        // console.log(error)
        res.status(500).json({
            payload: null,
            msg: error,
            err: true
        })
    }
})

//get comments by user id
// router.get('/:users_id', async (req, res) => {
//     try {
//         let commentByUserID = await db.any(`SELECT * FROM comments WHERE users_id = '${req.params.users_id}' `)
//         res.json({
//             payload: commentByUserID,
//             message:"got all comments by users id"
//         })
//     }catch (err){
        // console.log(err)
//         res.json({
//             error:err
//         })
//     }
// })

    // get comments by video id 
    router.get('/video/:video_id', async (req, res) => {
        const {video_id} = req.params
        try {
           const commentByVideoID = await comment.getCommentsByVideoID(video_id)
            res.json({
                payload: commentByVideoID,
                message:"got all comments by video id",
                err: false
            })
        }catch (err){
            // console.log(error)
            res.status(500).json({
                payload: null,
                msg: error,
                err: true
            })
        }
    });

        //post a new comment
router.post('/video/:video_id', async (req, res) => {
    const {users_id, body} = req.body
    // console.log(req.body)
    try {
        const addComment = await comment.addnewComment(users_id, body)
        res.json({
            payload: addComment,
            msg: "comment added",
            error: false
        })
    }catch(err) {
        // console.log("err", err)
        res.status(500).json({
            payload: null,
            msg: error,
            err: true
        })
    }
});

//Delete comment
router.delete('/', async (req, res) => {
    const {comment_id} = req.body
    console.log(req.body);
    try {
      const deleteComm = await comment.deleteCommentByID(comment_id)
      res.json({
        payload: deleteComm,
        message: `Deleted Comment`,
        err:false
      });
    } catch (error) {
    //   console.log(error);
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
