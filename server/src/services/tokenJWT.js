const jwt = require("jsonwebtoken")
const config = require("../config")

const set_Token = (user) => {
    const token = jwt.sign({
        email: user.email,
        password: user.password,
        exp: Date.now() + 1000*60*60*24
    }, config.SECRET)

    return token
}

module.exports = set_Token