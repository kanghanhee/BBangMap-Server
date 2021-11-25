const bakeryMulter = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
aws.config.loadFromPath(__dirname + "/../../config/s3.json");

const s3 = new aws.S3();

const reviewUpload = bakeryMulter({
  storage: multerS3({
    s3,
    bucket: "bbang-map",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(
        null,
        `images/review/` + Date.now() + "." + file.originalname.split(".").pop()
      );
    },
  }),
});

module.exports = reviewUpload;
