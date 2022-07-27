const bakeryMulter = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
aws.config.loadFromPath(__dirname + '/../config/s3.json');

const s3 = new aws.S3();
const bucketUrl = process.env.NODE_ENV === 'production' ? 'bbang-map' : 'bbang-map-test';

const bakeryUpload = bakeryMulter({
  storage: multerS3({
    s3,
    bucket: bucketUrl,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, `images/bakery/` + Date.now() + '.' + file.originalname.split('.').pop());
    },
  }),
});

module.exports = bakeryUpload;
