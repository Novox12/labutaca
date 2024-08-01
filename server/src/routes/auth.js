const {Router} = require('express');
const {methods: auth} = require('../controller/auth_controller')

const router = Router()

router.post('/login', auth.login)
router.get('/verification/:token', auth.verification_mail)
router.post('/passwordrecovery/:token', auth.password_recovery)

module.exports = router