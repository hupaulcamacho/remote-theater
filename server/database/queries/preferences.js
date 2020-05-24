const db = require('../db.js')


const getPreferenceByUserId = async (user_id) => {
    try{
        let preferenceQuery = 
       `SELECT * FROM preferences 
        INNER JOIN genres 
        ON preferences.genre_id = genres.id 
        WHERE user_id = $1`;
        let preferences = await db.any(preferenceQuery, [user_id])
        return preferences
    }catch(err){
        console.log("err", err)
    }
}

//show check if user likes that genre && insert if they don't have it preferences
const addNewPreference = async (user_id, genre_id) => {
try{
    let preferenceQuery = 'SELECT * FROM preferences WHERE user_id = $1 AND genre_id = $2';
    let preferenceInsertQuery = 'INSERT INTO preferences (user_id, genre_id) VALUES ($1, $2)'
    let alreadyPreference = await db.oneOrNone(preferenceQuery, [user_id, genre_id])
    if (!alreadyPreference) {
        await db.none(preferenceInsertQuery, [user_id, genre_id]);
    }
}catch(err){
    console.log(err)
}
}

module.exports = {
getPreferenceByUserId,
addNewPreference
}