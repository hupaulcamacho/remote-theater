const db = require('../db.js');

const createNewUser = async (user) => {
    const insertQuery = `INSERT INTO users (username, password) VALUES ($1, $2)`;

    await db.none(insertQuery, [user.name, user.password]);
    return true
};

const getAllUsers = async () => {
    const users = await db.any("SELECT * FROM users");
    return users
};

const getUserByName = async (username) => {
    const user = await db.any("SELECT FROM users WHERE username = $1", [username])
    return user
};

const getUserById = async (id) => {
    const user = await db.any("SELECT FROM users WHERE users_id = $1", [id])
    return user
};

module.exports = {
    createNewUser,
    getAllUsers,
    getUserByName,
    getUserById
};
