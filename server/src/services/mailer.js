const nodemailer = require('nodemailer')
const config = require('../config')

const send_mail = async (email, token, topic) => {
    
    const {subject, html} = topic

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        secure: true,
        auth: {
            user: config.EMAIL_MAILER,
            pass: config.PASSWORD_MAILER
        }
    })

    // switch (topic) {
    //     case 'mail_verification':
    //         subject = "Verificación de email"
    //         html = `
    //             <h1>Verificación de email</h1>
    //             <p>Para acceder a LaButaca, la mejor plataforma para ver series y peliculas, debes verificar tu correo electronico.</p>
    //             <br>
    //             <p>Aquí: <a href="http://localhost:3000/api/v1/auth/verification/${token}">Link</a></p>
    //         `
    //         break;

    //     case 'password_recovery':
    //         subject = "Recuperación de contraseña"
    //         html = `
    //             <h1>Recuperación de contraseña</h1>
    //             <p>Para recuperar tu contraseña sigue el siguiente enlace:</p>
    //             <br>
    //             <p>Aquí: <a href="http://localhost:3000/api/v1/auth/passwordrecovery/${token}">Link</a></p>
    //         `
    //         break;

    //     default:
    //         res.status(400).json({
    //             messsage: "Tema no encontrado",
    //             ok: false
    //         })
    //         break;
    // }

    const mailOptions = {
        from: config.EMAIL_MAILER,
        to: email,
        subject: subject,
        html: html,
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error(err)
            return res.status(500).json({
                message: 'Error al enviar correo',
                ok: false
            })
        } else {
            console.log(info)
            return res.status(200).json({
                message: 'Correo enviado',
                ok: true
            })
        }
    })
}

module.exports = send_mail