const {Router} = require('express');
const {methods: auth} = require('../controller/auth_controller')

const router = Router()

router.post('/login', auth.login)

module.exports = router