const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');

const access_key_id = process.env.AWS_ACCESS_KEY_ID;
const secret_access_key = process.env.AWS_SECRET_ACCESS_KEY;

const bucket_name = process.env.AWS_BUCKET_NAME;
const bucket_region = process.env.AWS_BUCKET_REGION;

const s3 = new S3({ access_key_id, secret_access_key });

/* Upload Files to S3 Buckets */
const uploadFileS3 = (file) => {
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
        Bucket: bucket_name,
        Body: fileStream,
        Key: file.filename
    }
    return s3.upload(uploadParams).promise();
}

/* Download Files from S3 Buckets */
const downloadFileS3 = (fileKey) => {
    const downloadParams = {
        Bucket: bucket_name,
        Key: fileKey
    }
    return s3.getObject(downloadParams);
}

exports.uploadFileS3 = uploadFileS3;
exports.downloadFileS3 = downloadFileS3;