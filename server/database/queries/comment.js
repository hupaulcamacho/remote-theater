const db = require('../db.js')


getAllComments = async () => {
    try {
        const comments = await db.any("SELECT * FROM comments");
        return comments
    } catch (error) {
        console.log("error", error)
    }
}

getCommentsByVideoID = async (video_id) => {
    try {
        const commentByVideoID = await db.any(`SELECT * FROM comments WHERE video_id = $1`, [video_id])
        console.log(commentByVideoID)
        return commentByVideoID
    } catch (error) {
        console.log("error", error)
    }
}

addnewComment = async (users_id, body) => {
try{
    const insertQuery = `INSERT INTO comments (id, comment_body) 
    VALUES($1, $2) RETURNING *`
    let response = await db.any(insertQuery, [users_id, body])
    console.log(insertQuery)
    return response;
}catch(error){
 console.log(error)
}
}

deleteCommentByID = async (comment_id) => {
    try{
        const deleteQuery =  `DELETE FROM comments
        WHERE id = $1 RETURNING *`;
        const deleteComment = await db.one(deleteQuery, [comment_id])
        return deleteComment;
    }catch(error){
        console.log("err", error)
    }
}

module.exports = {
    getAllComments,
    getCommentsByVideoID,
    addnewComment,
    deleteCommentByID
}