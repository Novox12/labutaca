const jwt = require("jsonwebtoken")
const config = require("../config")

const verify_token = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Token requerido", ok: false })
    }

    try {
        /* Recopilamos el token desde el header, token tipo Bearer */
        const token = req.headers.authorization.split(" ")[1]

        /* Verificamos el token y su expiración*/
        const decoded = jwt.verify(token, config.SECRET)

        if (decoded.exp < Date.now()) {
            return res.status(401).json({ message: "Token expirado", ok: false })
        }

        /* retornamos los datos del usuario */
        req.user = {
            uid: decoded.uid,
        }

        next()

    } catch (e) {
        console.error(e)
        return res.status(401).json({ message: "Unauthorized", ok: false })
    }
}

module.exports = verify_token