const db = require('../db.js')


//get all viewers

getAllViewer = async () => {
try{
    const viewers = await db.any(`SELECT * FROM viewer`)
    return viewers
}catch(err){
    console.log(err)
}
}

//get all viewers by video_id
getAllViewerByVideoID = async (video_id) => {
    try{
        const viewersByID = await db.any(`SELECT * FROM viewer WHERE video_id = $1`, [video_id])
        return viewersByID
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    getAllViewer,
    getAllViewerByVideoID
}