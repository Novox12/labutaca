const {Router} = require('express')
const {methods: user} = require('../controller/user_controller')

const router = Router()

router.post('/registro', user.registro)

module.exports = router 