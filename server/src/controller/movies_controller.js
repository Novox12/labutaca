const {PrismaClient} = require('@prisma/client')

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
        movie: movie.archivo, // Confirmar con Maicol :v
        ok: true
    })
}

const upload = async (req, res) => {

    // console.log(req.files)
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

exports.methods = {upload, get_all, get}