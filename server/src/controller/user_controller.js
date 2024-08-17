const {PrismaClient} = require('@prisma/client')
const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()
const set_Token_mail = require('../services/tokenMail')
const send_mail = require('../services/mailer') // No funciona aún, la appi esta complicada

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
        const token = set_Token_mail({email: email})
    
        const resultado = await prisma.user.create({data: {
                nombre: nombre,
                email: email,
                password: clave,
                idioma_id: idioma,
                verifyToken: token,
                verify: false
            },
        })

        if(!resultado) {
            return res.status(400).json({
                message: 'Error al registrar usuario '+resultado,
                ok: false
            })
        }

        await send_mail(email, {
            subject: "Verificación de email",
            html: `
                <h1>Verificación de email</h1>
                <p>Para acceder a LaButaca, la mejor plataforma para ver series y peliculas, debes verificar tu correo electronico.</p>
                <br>
                <p>Aquí: <a href="http://localhost:3000/api/v1/auth/verification/${token}">Link</a></p>
            `,
        })

        return res.status(200).json({
            data: "Usuario registrado correctamente, debera verificar su correo",
            // user: resultado,
            ok: true
        })

    } catch (e) {
        console.error(e) 
        res.status(500).send({message: 'Error al registrar usuario', ok: false})
    }


}

const password_recovery_mail = async (req, res) => {
    const email = req.body.email

    const user = await prisma.user.findUnique({
        where: {email: email}
    })

    if (!user) {
        return res.status(400).json({
            message: 'Verifique el correo',
            ok: false
        })
    }

    const token = set_Token_mail({
        email: email,
    })

    await prisma.tokens.create({
        data:{
            token: token
        }
    })

    await send_mail(email, {
        subject: "Recuperación de contraseña",
        html: `
            <h1>Recuperación de contraseña</h1>
            <p>Para recuperar tu contraseña sigue el siguiente enlace:</p>
            <br>
            <p>Aquí: <a href="http://localhost:5173/passwordrecovery?token=${token}">Link</a></p>
        `,
    })
    // http://localhost:3000/api/v1/auth/passwordrecovery/${token}

    return res.status(200).json({
        message: 'Correo enviado, verificar correo',
        ok: true
    })
}

exports.methods = {registro , get_all, get_one, password_recovery_mail}