const {PrismaClient} = require('@prisma/client')
const bcrypt = require('bcryptjs')
const set_Token = require('../services/tokenJWT')


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

exports.methods = {login}