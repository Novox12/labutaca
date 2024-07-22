const jwt = require("jsonwebtoken")
const config = require("../config")

const set_Token = (user) => {
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        idioma: user.idioma,
        exp: Date.now() + 1000*60*60*24
    }, config.SECRET)

    return token
}

module.exports = set_Token

/* Id, Email, nombre, idioma    url-foto */
/* Quitar contraseña */

/*
    1. Crear la base de datos para las peliculas (Investigar sobre el streaming) [titulo, descripcion, urlarchivo, urlCaratula, fo_idiomas]
    2. Relacionarlo con tabla foranea de idiomas

    Por ahora, solamente manejar la url del archivo
*/