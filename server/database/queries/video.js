const db = require('../db.js')

getAllVideos = async () => {
try{
    const comments = await db.any("SELECT * FROM videos");
    return comments
}catch(err){
    console.log("err", err)
}
}


getAllVideosByid = async (id) => {
    try{
    const videoByid = 'SELECT * FROM videos WHERE id = $1';
    let video = await db.any(videoByid, [id]);
    return video
    }catch(err){
        console.log("err", err)
    }
    }

getAllVideoByTitle = async (title) => {
    try{
    const videoQuery = 'SELECT * FROM videos WHERE title = $1';
    let video = await db.any((videoQuery), [title]);
    return video
    }catch(err){
        console.log("err", err)
    }
    }

getVideoByGenre = async (genre) => {
    try{
        const videoGenre = 'SELECT * FROM videos JOIN genres ON genres.id = videos.genre_id WHERE name = $1';
        let video = await db.any((videoGenre), [genre]);
        return video
    }catch(err){
        console.log("err", err)
    }
    }

postNewVideo = async (title, genre_id, description, video_url, rating) => {
    try{
        let postQuery = 'INSERT INTO videos(title, genre_id, description, video_url, rating) '
            + 'VALUES ($1, $2, $3, $4, $5)';
            let createNewVideo = await db.any((postQuery), [title, genre_id, description, video_url, -1]);
            return createNewVideo
    }catch(err){
        console.log("err", err)
    }
    }

deleteVideo = async (id) => {
    try{
        let deleteQuery = 'DELETE FROM videos WHERE id = $1';
        let deleteVideo = await db.none((deleteQuery), [id]);
        return deleteVideo
    }catch(err){
        console.log("err", err)
    }
    }

getAllVideoByGenreId = async (genre_id) => {
        try{
        let videoQuery = 'SELECT * FROM videos WHERE genre_id = $1';
        let videos = await db.any(videoQuery, [genre_id]);
        return videos
        }catch(err){
console.log("err", err)
        }
    }

    getVideoByRatings = async(howMany, rating) => {
        try{
            let ratingsQuery2 = `SELECT * FROM videos WHERE rating >= $2 ORDER BY rating DESC LIMIT $1`
            let vidRating = await db.any(ratingsQuery2,[howMany, rating]);
            return vidRating
        }catch(err){
            consolr.log("err", err)
        }
        
    }

    module.exports = {
        getAllVideos,
        getAllVideoByGenreId,
        getAllVideoByTitle,
        getAllVideosByid,
        getVideoByGenre,
        deleteVideo,
        postNewVideo, 
        getVideoByRatings
    }