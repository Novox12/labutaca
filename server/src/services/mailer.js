const nodeMailer = require('nodemailer')

/* No funciona aún, la appi esta complicada */
const send_mail = async (email, token) => {
    const transporter = nodeMailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: "maddison53@ethereal.email",
            pass: "jn7jnAPss4f63QBp6D",
        },
    })

    const mailOptions = {
        from: "maddison53@ethereal.email",
        to: email,
        subject: 'Verificacion de correo',
        text: 'Por favor haga click en el siguiente link para verificar su correo',
        html: `<a href="http://localhost:3000/api/v1/auth/verification/${token}">Verificar</a>`
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