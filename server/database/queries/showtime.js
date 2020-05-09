const db = require('../db.js')

showtimesByVideoid = async (videoID) =>{
    try{
        let showtimeQuery = 'SELECT * FROM showtimes WHERE video_id = $1';
        let allShowtimes = await db.any(showtimeQuery, [videoID]);
        return allShowtimes
    }catch(err){
console.log("err", err)
    }

}

module.exports = {
    showtimesByVideoid
}