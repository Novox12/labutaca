const {config} = require("dotenv")

config()

module.exports = {
    SECRET: process.env.SECRET,
    EMAIL_MAILER: process.env.EMAIL_MAILER,
    PASSWORD_MAILER: process.env.PASSWORD_MAILER,
}