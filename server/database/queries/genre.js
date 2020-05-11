const db = require('../db.js')


getAllGenres = async () => {
    try {
        let genreQuery = 'SELECT * FROM genres';
        let allGenres = await db.any(genreQuery);
        return allGenres
    }catch(err){
        console.log("err", err)
    }
}

module.exports ={
    getAllGenres
}