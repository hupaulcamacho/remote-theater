const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/id/:user_id', async (req, res) => {
	try {
		let preferenceQuery = 'SELECT * FROM preferences INNER JOIN genres ON preferences.genre_id = genres.id WHERE user_id = $1';
		let preferences = await db.any(preferenceQuery, [req.params.user_id]);
		res.status(200).json({
			status: 'success',
			payload: preferences
		});
	}
	catch(err) {
		res.status(500).json({
            payload: null,
            msg: err,
            err: true
        })
	}
});

router.post('/add/:user_id/:genre_id', async (req, res) => {
	try {
		let preferenceQuery = 'SELECT * FROM preferences WHERE user_id = $1 AND genre_id = $2';
		let preferenceInsertQuery = 'INSERT INTO preferences (user_id, genre_id) VALUES ($1, $2)'
		let preference = await db.oneOrNone(preferenceQuery, [req.params.user_id, req.params.genre_id]);
		if (!preference) {
			await db.none(preferenceInsertQuery, [req.params.user_id, req.params.genre_id]);
		}
		res.status(200).json({
            status: 'success',
            message: 'Preferences added.'
        });
	}
	catch(err) {
		res.status(500).json({
            payload: null,
            msg: err,
            err: true
        })
	}
});

module.exports = router;    