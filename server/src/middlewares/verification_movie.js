const multer = require("multer")

const movies_path = "./public/movies/"
var file_name = ""

const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, movies_path)
    },
    filename: function (req, file, cd) {
        file_name = Date.now()+"-"+file.originalname
        cd(null, file_name)
    }
})

const upload_movie = multer({ storage })

module.exports = upload_movie