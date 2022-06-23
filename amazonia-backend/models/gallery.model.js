const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
    {
        "userId": { type: String, required: true, unique: true },
        "email": { type: String, required: true, unique: true },
        "files": [{type: Object}]
    }
);

module.exports = mongoose.model('GalleryFile', gallerySchema);