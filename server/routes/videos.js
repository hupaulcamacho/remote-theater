const express = require('express');
const router = express.Router();
const videos = require('../database/queries/video')


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

router.get('/ratings/:howMany/:minRating', async (req, res) => {
	try{
		let howMany = parseInt(req.params.howMany);
		let rating = parseInt(req.params.minRating)
		let getTopVideos = await videos.getVideoByRatings(howMany, rating);
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
	let {genreId} = req.params.id
	try {
		let videoQuery = await videos.getAllVideoGenreId(genreId)
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