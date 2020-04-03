const express = require('express');
const router = express.Router();
const showroomQueries =  require('../database/queries/showrooms');

// get all showrooms by id
router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        let showrooms = await showroomQueries.getAllShowroomsById(id);
        res.json(+{
            payload: showrooms,
            message: 'retrieved all showrooms',
            err: false
        });
    } catch (err) {
        res.status(500).json({
            payload: null,
            message: 'failed retrieving showrooms',
            err: true
        });
    }
});

// get all showrooms by movie title
router.get('/:title', async (req, res, next) => {
    const title = req.params.title;
    try {
        let showrooms = await showroomQueries.getAllShowroomsByTitle(title);
        res.json(+{
            payload: showrooms,
            message: 'retrieved all showrooms',
            err: false
        });
    } catch (err) {
        res.status(500).json({
            payload: null,
            message: 'failed retrieving showrooms',
            err: true
        });
    }
});