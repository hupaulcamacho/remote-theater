const bcrypt = require('bcrypt')


const hashPassword = async (password) => {
try{
const salt = await bcrypt.genSalt(12)
const password_digest = await bcrypt.hash(password, salt)
// console.log(password_digest)
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


module.exports ={
    hashPassword,
    comparePasswords
}