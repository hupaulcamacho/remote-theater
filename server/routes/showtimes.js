const express = require('express');
const router = express.Router();
const db = require('../database/db');

// get showtimes for a video

router.get('/id/:id', async  (req, res) => {
    let videoID = req.params.id
	try {
		let showtimeQuery = 'SELECT * FROM showtimes WHERE video_id = $1';
		let allShowtimes = await db.any(showtimeQuery, [videoID]);
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