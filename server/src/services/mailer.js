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