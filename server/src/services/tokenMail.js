const jwt = require('jsonwebtoken')
const config = require('../config')

const set_Token_mail = (user) => {
    const token = jwt.sign({
        email: user.email
    }, config.SECRET)

    return token
}

module.exports = set_Token_mail