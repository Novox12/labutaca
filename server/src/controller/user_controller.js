const {PrismaClient} = require('@prisma/client')
const bcrypt = require('bcryptjs')


const registro = async (req, res) => {
    const prisma = new PrismaClient()

    try {
        const {nombre, email, password, idioma} = req.body

        const salt = await bcrypt.genSalt(10)
        const clave = await bcrypt.hash(password, salt)
    
        const resultado = await prisma.user.create({data: {
                nombre: nombre,
                email: email,
                password: clave,
                idioma: idioma
            },
        })

        return res.status(200).json({
            data: "Usuario registrado correctamente",
            user: resultado,
            ok: true
        })

    } catch (e) {
        console.error(e) 
        res.status(500).send({message: 'Error al registrar usuario', ok: false})
    }


}

exports.methods = {registro}