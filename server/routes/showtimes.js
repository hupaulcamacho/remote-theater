const express = require('express');
const router = express.Router();
const db = require('../database/db');
const showtime = require('../database/queries/showtime')

// get showtimes for a video

router.get('/id/:id', async  (req, res) => {
    const videoID = req.params.id
	try {
		let allShowtimes = await showtime.showtimesByVideoid(videoID)
		res.status(200).json({
			status: 'success',
			payload: allShowtimes
		});
	}
	    catch(err){
		res.status(500).json({
            payload: null,
            message: 'failed retrieving showtimes',
            err: true
        });
	}
});

module.exports = router;