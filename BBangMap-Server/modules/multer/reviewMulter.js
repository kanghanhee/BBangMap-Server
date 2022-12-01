const reviewMulter = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

aws.config.loadFromPath(__dirname + '/../../config/s3.json');

const s3 = new aws.S3();
const bucketUrl = process.env.NODE_ENV === 'production' ? 'bbang-map' : 'bbang-map-test';

const reviewUpload = reviewMulter({
  storage: multerS3({
    s3,
    bucket: bucketUrl,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `images/review/` + Date.now() + '.' + file.originalname.split('.').pop());
    },
  }),
});

const reviewDelete = imageUrls => {
  const objects = [];
  imageUrls.forEach(imageUrl => {
    const url = imageUrl.split('/');
    objects.push({ Key: url.slice(3).join('/') });
  });
  const params = {
    Bucket: bucketUrl,
    Delete: {
      Objects: objects,
    },
  };
  s3.deleteObjects(params, function (err, data) {
    if (err) throw err;
  });
};

module.exports = { reviewUpload, reviewDelete };
