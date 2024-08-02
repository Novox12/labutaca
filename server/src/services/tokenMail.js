const jwt = require('jsonwebtoken')
const config = require('../config')

const set_Token_mail = (user) => {
    const token = jwt.sign({
        email: user.email,
        exp: Date.now() + 2 * 60 * 60 * 1000,
    }, config.SECRET)

    return token
}

module.exports = set_Token_mail