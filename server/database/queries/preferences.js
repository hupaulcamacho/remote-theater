const db = require('../db.js')


getPreferenceByGenreId = async (user_id) => {
    try{
		let preferenceQuery = 'SELECT * FROM preferences INNER JOIN genres ON preferences.genre_id = genres.id WHERE user_id = $1';
        let preferences = await db.any(preferenceQuery, [user_id])
        return preferences
    }catch(err){
        console.log("err", err)
    }
}


module.exports = {
getPreferenceByGenreId
}