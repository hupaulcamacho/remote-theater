const express = require('express');
const router = express.Router();
const genres = require('../database/queries/genre')

/* GET all genres */
router.get('/', async (req, res) => {
    try {
        const allGenres = await genres.getAllGenres()

        res.status(200).json({
            message: "Success retrieved all genres from database",
            payload: allGenres
        });

    } catch (err) {
        handleErrors(res, err)
    }
})



module.exports = router;