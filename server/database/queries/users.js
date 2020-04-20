const db = require('../db');

const createNewUser = async (user) => {
    const insertQuery = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`;

    await db.none(insertQuery, [user.name, user.email, user.password]);
    return true
};

const getAllUsers = async () => {
    const users = await db.any("SELECT id, name, email FROM users");
    return users
};

const getUserByEmail = async (email) => {
    const user = await db.oneOrNone("SELECT * FROM users WHERE email = $1", [email])
    return user
};

const getUserById = async (id) => {
    const user = await db.any("SELECT FROM users WHERE users_id = $1", [id])
    return user
};

module.exports = {
    createNewUser,
    getAllUsers,
    getUserByEmail,
    getUserById
};
