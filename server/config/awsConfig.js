const AWS = require('aws-sdk');

module.exports = new AWS.S3({
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_ACCESS_KEY,
            region:process.env.BUCKET_REGION,
        });

