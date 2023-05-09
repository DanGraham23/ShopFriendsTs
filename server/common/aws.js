const s3 = require('../config/awsConfig');

module.exports.uploadImage = (image_name, image_file) => {
    const params = {
        Bucket : process.env.BUCKET_NAME,
        Key: image_name,
        Body: image_file.buffer,
        ContentType: image_file.mimetype,
    }
    
    s3.putObject(params, (err, data)=> {
        if (err){
            console.log(err);
            return false;
        }
    });
    return true;
}

module.exports.deleteImage = (image_name) => {
    const params = {
        Bucket : process.env.BUCKET_NAME,
        Key: image_name,
    }
    
    s3.deleteObject(params, (err, data)=> {
        if (err){
            console.log(err);
            return false;
        }
    });
    return true;
}

module.exports.getImageUrl = (profile_picture) => {
    const url = s3.getSignedUrl('getObject', {
        Bucket : process.env.BUCKET_NAME,
        Key: profile_picture,
        Expires: 3600,
    });

    return url;
}