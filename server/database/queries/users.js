const db = require('../database');


const createNewUser = (user) => {
    const insertQuery = `INSERT INTO users (username, password_digest) VALUES ($1, $2)`;
    await db.none(insertQuery, [user.name, user.password]);
    return true
};

const getAllUsers = () => {
    const users = await db.any("SELECT * FROM users");
    return users
};

const getUserByName = (username) => {
    const user = await db.any("SELECT FROM users WHERE username = $1", [username])
    return user
};

const getUserById = (id) => {
    const user = await db.any("SELECT FROM users WHERE users_id = $1", [id])
    return user
};

module.exports = {
    createNewUser,
    getAllUsers,
    getUserByName,
    getUserById
}