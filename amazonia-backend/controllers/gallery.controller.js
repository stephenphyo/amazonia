const path = require('path');
const galleryModel = require('../models/gallery.model');

/* Temp */
const fs = require('fs');
const { uploadFileS3 } = require(path.join(__basedir, 'aws/s3/s3.aws.js'));

const galleryCtrl = {
    // UploadImages: async (req, res) => {
    //     const s3_obj_metadata = await uploadFileS3(req.file);


    //     /* Temp */
    //     var read_data = fs.readFileSync('object.json', 'utf8');
    //     var append_data = [s3_obj_metadata.Location]
    //     var data = JSON.parse(read_data).key.concat(append_data);
    //     var write_data = { key: data };

    //     fs.writeFile('object.json', JSON.stringify(write_data), (err) => {
    //         if (err) {
    //             console.log(err.message)
    //         } else {
    //             console.log("Success")
    //         }
    //     })
    //     res.status(201).send("Gallery Upload Done");
    // },

    postUploadImages: (req, res) => {
        const userInfo = JSON.parse(req.body['userInfo']);
        const modelQuery = {
            userId: userInfo.userId,
            email: userInfo.email
        };
        const modelData = {
            $push: {
                files: {
                    $each: [
                        {
                            file_url: req.file.location,
                            file_mime: req.file.mimetype,
                            file_size: req.file.size
                        }
                    ]
                }
            }
        };

        galleryModel.findOneAndUpdate(modelQuery, modelData, { upsert: true },
            (err) => {
                if (!err) {
                    res.status(201).send({ message: "Gallery Files Updated" });
                } else {
                    res.status(500).send({ message: err.message });
                }
            });
        /*
        console.log({
            userId: userInfo.userId,
            email: userInfo.email,
            file_url: req.file.location,
            file_mime: req.file.mimetype,
            file_size: req.file.size
        });
        */
    },

    getFileList: (req, res) => {
        console.log(req.query);

        const modelQuery = req.query;

        galleryModel.findOne(modelQuery, (err, data) => {
            console.log(data)
            if (!err) {
                if (data !== null) {
                    res.status(200).send(data);
                } else {
                    res.status(204).send({ message: "Data not found" });
                }
            } else {
                res.status(500).send({ message: err.message });
            }
        });
    }
}

module.exports = galleryCtrl;