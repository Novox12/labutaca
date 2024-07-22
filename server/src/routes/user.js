const {Router} = require('express')
const {methods: user} = require('../controller/user_controller')
const verify_token = require('../middlewares/verificacion_token')

const router = Router()

router.get('/all', verify_token, user.get_all)
router.get('/one/:id', verify_token, user.get_one)
router.get('/one-data', user.get_token)
router.post('/registro', user.registro)

module.exports = router 