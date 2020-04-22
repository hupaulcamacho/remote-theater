const bcrypt = require('bcrypt');


const hashPassword = async (password) => {
try{
const salt = await bcrypt.genSalt(12)
const password_digest = await bcrypt.hash(password, salt)
return password_digest
}catch(error){
console.log("error:", error)
}
}

const comparePasswords = async (candidatePassword, password_digest) => {
    try{
        const match = await bcrypt.compare(candidatePassword, password_digest)
        return match
    }catch(err){
        console.log("err", err)
    }
}

const loginRequired = (req, res, next) => {
    if (req.user) return next()
    res.status(401).json({
        payload: null,
        msg: "Not logged in",
        err: true
    })
}

module.exports ={
    hashPassword,
    comparePasswords,
    loginRequired
}