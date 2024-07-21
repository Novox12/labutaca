const express = require('express')
const morgan = require('morgan')

const user = require('./routes/user')

const app = express()
app.set('port', 3000)
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/user', user)

module.exports = app