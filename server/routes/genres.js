const express = require('express');
const router = express.Router();
const db = require('../database/db');

/* GET all genres */
router.get('/', async (req, res) => {
    console.log('hi there');
    try {
        let genreQuery = 'SELECT * FROM genres';
        let allGenres = await db.any(genreQuery);

        console.log(allGenres);
        res.status(200).json({
            message: "Success retrieved all genres from database",
            payload: allGenres
        });

    } catch (err) {
        handleErrors(res, err)
    }
})



module.exports = router;