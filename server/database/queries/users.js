const db = require('../db');
const authHelpers = require("../../auth/helpers")

const createNewUser = async (user) => {
    const insertQuery = `INSERT INTO users (name, email, password) VALUES ($/username/, $/email/, $/password/) RETURNING *`;

    const newUser = await db.one(insertQuery, {
        username: user.name, 
        email: user.email, 
        password: user.password});
    delete newUser.password

    return newUser
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
    const user = await db.any("SELECT * FROM users WHERE id = $1", [id])
    return user
};

module.exports = {
    createNewUser,
    getAllUsers,
    getUserByEmail,
    getUserById
};
