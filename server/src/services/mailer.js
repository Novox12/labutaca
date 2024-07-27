const nodemailer = require('nodemailer')
const config = require('../config')

const send_mail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        secure: true,
        auth: {
            user: config.EMAIL_MAILER,
            pass: config.PASSWORD_MAILER
        }
    })
    
    const mailOptions = {
        from: config.EMAIL_MAILER,
        to: email,
        subject: 'Buenos días 23',
        html: `
            <h1>Verificación de email</h1>
            <p>Para acceder a LaButaca, la mejor plataforma para ver series y peliculas, debes verificar tu correo electronico.</p>
            <br>
            <p>Aquí: <a href="http://localhost:3000/api/v1/auth/verification/${token}">Link</a></p>
        `,
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