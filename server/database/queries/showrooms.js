const db = require('../db.js');

const createNewShowroom = async (showroom) => {
    const insertQuery = `INSERT INTO showrooms (title, video_id) VALUES ($1, $2)`;
    await db.none(insertQuery, [showroom.title, showroom.id])
    return true
};

const getAllShowroomsByTitle = async (title) => {
    const showrooms = await db.any("SELECT * FROM showrooms WHERE title = $1", [title]);
    return showrooms
};

const getAllShowroomsById = async (id) => {
    const showrooms = await db.any("SELECT * FROM showrooms WHERE showroom_id = $1", [id]);
    return showrooms
};

module.exports = {
    createNewShowroom,
    getAllShowroomsByTitle,
    getAllShowroomsById
};