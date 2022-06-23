const multer = require('multer');
const path = require('path');

var multer_storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({ storage: multer_storage });

const profileMid = {
    UploadImages: upload.array("file")
}

module.exports = profileMid;