const express = require('express');
const router = express.Router();
const videos = require('../database/queries/video')
const db = require('../database/db.js')


router.get('/', async  (req, res) => {
	try{
		let videoQuery = await videos.getAllVideos()
		res.status(200).json({
			status: 'success',
			payload: videoQuery
		});
	}
	catch(err){
		handleErrors(res, err);
	}
});

router.get('/id/:id', async (req, res) => {
	const id = req.params.id
	try{
		let video = await videos.getAllVideosByid(id)
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
	const title = req.params.title
	try {
		let videoTitle = await videos.getAllVideoByTitle(title);
		res.status(200).json({
			status: 'success',
			payload: videoTitle
		});
	}
	catch(err){
		handleErrors(res, err);
	}
});



router.get('/genre/:genre', async (req, res) => {
	const genre = req.params.genre
	try {
		let videoByGenre = await videos.getVideoByGenre(genre)
		res.status(200).json({
			status: 'success',
			payload: videoByGenre
		});
	}
	catch(err){
		handleErrors(res, err);
	}
});

router.post('/', async (req, res) => {
	const {title, genre_id, description, video_url, rating} = req.body
	try{
		createNewVideo = await videos.postNewVideo(title, genre_id, description, video_url, rating)
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
	const {id }= req.body
	try{
		videoDelete = await videos.deleteVideo(id)
		res.status(204).end();
	}
	catch(err){
		console.log(err);
	};
})

// Get all videos by genre id
router.get('/genre/id/:id', async (req, res) => {
	let genreId = req.params.id
	try {
		let videoQuery = 'SELECT * FROM videos WHERE genre_id = $1';
		const videos = await db.any(videoQuery, [genreId]);
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