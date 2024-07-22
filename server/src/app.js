const express = require('express')
const morgan = require('morgan')

const user = require('./routes/user')
const auth = require('./routes/auth')

const app = express()
app.set('port', 3000)
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/user', user)
app.use('/api/v1/auth', auth)

module.exports = app