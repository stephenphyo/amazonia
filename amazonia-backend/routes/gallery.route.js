const router = require('express').Router();
const path = require('path');
const galleryCtrl = require(path.join(__basedir, '/controllers/gallery.controller.js'));
const galleryMid = require(path.join(__basedir, '/middleware/gallery.middleware.js'));

/* GET */
router.get('/filelist', galleryCtrl.getFileList);

/* POST */
router.post('/upload', galleryMid.postUploadImages, galleryCtrl.postUploadImages);

module.exports = router;