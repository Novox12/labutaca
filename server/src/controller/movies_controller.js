const {PrismaClient} = require('@prisma/client')
const fs = require('fs')

const prisma = new PrismaClient()

const get_all = async (req, res) => {
    const movies = await prisma.movies.findMany()
    .catch((error) => {
        return res.status(400).json({
            message: 'Error al obtener las peliculas ('+error+')',
            ok: false
        })
    })

    return res.status(200).json({
        movies,
        ok: true
    })
}

const get = async (req, res) => {
    const movie = await prisma.movies.findUnique({
        where: {titulo: req.params.titulo}
    })

    if(!movie) {
        return res.status(404).json({
            message: 'Pelicula no encontrada',
            ok: false
        })
    }

    res.status(200).json({
        id: movie.id,
        ok: true
    })
}

const get_path = async (req, res) => {
    if(!req.params.id) {
        return res.status(400).json({
            message: 'Falta ID',
            ok: false
        })
    }

    const movie = await prisma.movies.findUnique({
        where: {id: parseInt(req.params.id)}
    })

    if(!movie) {
        return res.status(404).json({
            message: "pelicula no encontrada",
            ok: false
        })
    }

    return res.status(200).json({
        path: movie.archivo,
        miniatura: movie.miniatura,
    })
}

const upload = async (req, res) => {

    const movie = await prisma.movies.findUnique({
        where: {titulo: req.body.titulo}
    })

    if (movie) {

        /* Delete files - Evitamos inyecciones */
        fs.unlinkSync(req.files.movie[0].path)
        fs.unlinkSync(req.files.miniatura[0].path)

        return res.status(400).json({
            message: 'Ya existe una pelicula con ese titulo',
            ok: false
        })
    }
    
    await prisma.movies.create({
        data: {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            archivo: req.files.movie[0].path,
            miniatura: req.files.miniatura[0].path, 
            idioma_id: parseInt(req.body.idioma_id),
        }
    })

    return res.status(200).json({
        message: 'Pelicula subida correctamente',
        ok: true
    })
}

exports.methods = {upload, get_all, get, get_path}