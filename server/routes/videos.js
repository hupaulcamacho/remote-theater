const express = require('express');
const router = express.Router();
const db = require('../database/db');


router.get('/', async  (req, res) => {
	try{
		let videoQuery = 'SELECT * FROM videos';
		let allVideos = await db.any(videoQuery);
		res.status(200).json({
			status: 'success',
			payload: allVideos
		});
	}
	catch(err){
		handleErrors(res, err);
	}
});

router.get('/id/:id', async (req, res) => {
	try{
		let videoQuery = 'SELECT * FROM videos WHERE id = $1';
		let video = await db.any(videoQuery, [req.params.id]);
		res.status(200).json({
			status: 'success',
			payload: video
		});
	}
	catch(err){
		handleErrors(res,err);
	}
});

router.get('/title/:title', async (req, res) => {
	try {
		let videoQuery = 'SELECT * FROM videos WHERE title = $1';
		let video = await db.any((videoQuery), [req.params.title]);
		res.status(200).json({
			status: 'success',
			payload: video
		});
	}
	catch(err){
		handleErrors(res, err);
	}
});



router.get('/genre/:genre', async (req, res) => {
	try {
		let videoQuery = 'SELECT * FROM videos JOIN genres ON genres.id = videos.genre_id WHERE name = $1';

		let video = await db.any((videoQuery), [req.params.genre]);
		res.status(200).json({
			status: 'success',
			payload: video
		});
	}
	catch(err){
		handleErrors(res, err);
	}
});

router.post('/', async (req, res) => {
	try{

		let postQuery = 'INSERT INTO videos(title, genre_id, description, video_url, rating) '
			+ 'VALUES ($1, $2, $3, $4, $5)';
		let createNewVideo = await db.any((postQuery), [req.body.title, req.body.genre_id, req.body.description, req.body.video_url, -1]);
		res.status(204).end();
	}
	catch(err){
		handleErrors(res, err);
	}
});

router.get('/ratings/:howMany/:highest', async (req, res) => {
	try{
		let ratingsQuery2 = `SELECT * FROM videos WHERE rating > ${req.params.highest} ORDER BY rating DESC LIMIT $1`
		// let ratingsQuery = (req.params.highest === 'highest') ? 'SELECT * FROM videos ORDER BY rating DESC LIMIT $1' : 'SELECT * FROM videos ORDER BY rating ASC LIMIT $1';
		let howMany = parseInt(req.params.howMany);
		let getTopVideos = await db.any(ratingsQuery2, [howMany]);
		res.status(200).json({
			status: 'success',
			payload: getTopVideos
		});
	}
	catch(err){
		console.log(err);
	}
});

router.delete('/deleteVideo', async (req, res) => {
	try{
		let deleteQuery = 'DELETE FROM videos WHERE id = $1';
		let deleteVideo = await db.none((deleteQuery), [req.body.id]);
		res.status(204).end();
	}
	catch(err){
		console.log(err);
	};
})

// Get all videos by genre
router.get('/genre/id/:id', async (req, res) => {
	let genreId = req.params.id
	try {
		let videoQuery = 'SELECT * FROM videos WHERE genre_id = $1';

		let videos = await db.any(videoQuery, [genreId]);
		res.status(200).json({
			status: 'success',
			message: 'retrieved videos',
			payload: videos
		});
	}
	catch(err){
		res.status(500).json({
			payload: null,
     		message: 'failed retrieving videos',
     		err: true
		})
	}
});






module.exports = router;