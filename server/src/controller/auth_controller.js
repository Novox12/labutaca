const {PrismaClient} = require('@prisma/client')
const bcrypt = require('bcryptjs')
const set_Token = require('../services/tokenJWT')
const jwt = require('jsonwebtoken')
const config = require('../config')


const prisma = new PrismaClient()

const login = async (req, res) => {
    const {email, password} = req.body

    result = await prisma.user.findUnique({
        where: {email: email}
    })

    if(!result) {
        return res.status(404).json({
            message: 'Usuario no encontrado',
            ok: false
        })
    }

    if(!result.verify) {
        return res.status(400).json({
            message: 'Usuario no verificado',
            ok: false
        })
    }

    const validPassword = await bcrypt.compare(password, result.password)

    if (!validPassword) {
        return res.status(400).json({
            message: 'Contraseña incorrecta',
            ok: false
        })
    }

    const user = {
        id: result.id,
        email: result.email,
        nombre: result.nombre,
        idioma: result.idioma
    }

    const token = set_Token(user)

    return res.status(200).json({
        data: token,
        ok: true
    })
}

const verification_mail = async (req, res) => {
    const token = req.params.token

    if (!token) {
        return res.status(400).json({
            message: 'Token no encontrado',
            ok: false
        })
    }

    const {email} = jwt.verify(token, config.SECRET)

    const result = await prisma.user.update({
        where: {email: email, verifyToken: token},
        data: {verify: true}
    })

    if (!result) {
        return res.status(400).json({
            message: 'Usuario no encontrado',
            ok: false
        })
    }

    return res.status(200).json({
        message: 'Usuario verificado',
        ok: true
    })
}

exports.methods = {login, verification_mail}