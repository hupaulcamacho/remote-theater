const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(12)
        const password_digest = await bcrypt.hash(password, salt)
        return password_digest
    } catch (error) {
        console.log("error:", error)
    }
}

const comparePasswords = (candidatePassword, password_digest) => {
    try {
        let match = bcrypt.compare(candidatePassword, password_digest)
        return match
    } catch (err){
        console.log(err)
    }
}

const loginRequired = (req, res, next) => {
    if (req.user) return next()
    res.status(401).json({
        payload: {
            message: "Unauthorized - to access this route you have to be logged in"
        },
        error: true
    })
}

module.exports = {
    hashPassword,
    comparePasswords,
    loginRequired
}