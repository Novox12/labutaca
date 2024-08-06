const multer = require("multer")

const movies_path = "./public/movies/"

const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, movies_path)
    },
    filename: function (req, file, cd) {
        const unique_code = Date.now() + "-" + Math.round(Math.random() * 1E9) + "." + file.originalname.split(".")[1]
        cd(null, file.fieldname+"-"+unique_code)
    }
})

const upload_movie = multer({ storage })

module.exports = upload_movie