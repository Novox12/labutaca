const { Router } = require('express')
const upload_movie = require('../middlewares/verification_movie')
const verify_token = require('../middlewares/verificacion_token')
const { methods: movie } = require('../controller/movies_controller')

const router = Router()

router.get('/all', verify_token, movie.get_all)
router.get('/one/:titulo', verify_token, movie.get)

router.post('/upload', upload_movie.fields([{ name: 'movie', maxCount: 1 }, { name: 'miniatura', maxCount: 1 }]), movie.upload)

module.exports = router