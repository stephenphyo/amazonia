const path = require('path');
const multer = require('multer');
const multer_s3 = require('multer-s3');
const S3 = require('aws-sdk/clients/s3');
const { getdatetime } = require(path.join(__basedir, 'functions/getdatetime.js'));
require('dotenv').config();

/* Multer Uploads with 'dest' Key */
/*
    var upload = multer({ dest: "uploads/" });
*/

/* Multer Uploads with 'storage' Key (Local Storage) */
/*
    var multer_storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        const dt = getdatetime(new Date());
        const dt_str = `${dt.yyyy}_${dt.MM}_${dt.dd}_${dt.hh}_${dt.mm}`;
        cb(null, `${dt_str}_${name}${ext}`);
    }
});
var upload = multer({ storage: multer_storage });
*/

/* Multer Uploads with 'storage' Key (AWS S3 Bucket) */
const s3_config = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

var multer_storage_s3 = multer_s3({
    s3: s3_config,
    bucket: `${process.env.AWS_BUCKET_NAME}`,
    // acl: 'public-read',
    key: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        const dt = getdatetime(new Date());
        const dt_str = `${dt.yyyy}_${dt.MM}_${dt.dd}_${dt.hh}_${dt.mm}`;
        cb(null, `${dt_str}_${name}${ext}`);
    },

});
var upload = multer({ storage: multer_storage_s3 });

const galleryMid = {
    /* Multer Multiple Files Upload */
    // postUploadImages: upload.array("file")

    /* Multer Single File Upload */
    postUploadImages: upload.single("file")
}

module.exports = galleryMid;