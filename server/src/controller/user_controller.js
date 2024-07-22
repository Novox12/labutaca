const {PrismaClient} = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()

const get_all = async (req, res) => {
    try {
        const result = await prisma.user.findMany()
        
        return res.status(200).json({data: result, ok: true})
    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'Error al obtener usuarios', ok: false})
    }
}

const get_one = async (req, res) => {
    const id = req.params.id

    try {
        const result = await prisma.user.findUnique({
            where: {id: parseInt(id)}
        })
        
        if (result) {
            return res.status(200).json({
                data: result,
                ok: true
            })
        }
    
        return res.status(404).json({
            message: 'Usuario no encontrado',
            ok: false
        })
    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'Error al obtener usuario', ok: false})
    
    }
}

const registro = async (req, res) => {
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

exports.methods = {registro , get_all, get_one}