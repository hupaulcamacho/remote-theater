const express = require('express');
const router = express.Router();
const preferences = require('../database/queries/preferences')
const db = require('../database/db.js')

router.get('/id/:user_id', async (req, res) => {
	const id = req.params.user_id
	try {
		let preference = await preferences.getPreferenceByUserId(id)
		res.status(200).json({
			status: 'success',
			payload: preference
		});
	}
	catch(err){
		console.log(err)
		res.status(500).json({
            payload: null,
            msg: err,
            err: true
        })
	}
});

router.post('/add/:user_id/:genre_id', async (req, res) => {
	const user_id = req.params.user_id
	const genre_id = req.params.genre_id
	try {
		let preference = await preferences.addNewPreference(user_id, genre_id)
		res.status(200).json({
            status: 'success',
			message: 'Preferences added.',
			payload: preference
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

router.delete('/delete/:user_id/:genre_id', async (req, res) => {
	let user_id = req.params.user_id
	let genre_id = req.params.genre_id
	let deletequery = 'DELETE FROM preferences WHERE user_id = $1 AND genre_id = $2';
	try {
		await db.none(deletequery, [user_id, genre_id]);
		res.status(200).json({
            status: 'success',
			message: 'Preference deleted.',
        });
	} catch(err) {
		res.status(500).json({
			msg: err,
			err: true
		})
	}
})

module.exports = router;    