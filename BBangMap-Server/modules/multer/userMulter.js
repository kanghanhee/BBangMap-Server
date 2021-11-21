const userMulter = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
aws.config.loadFromPath(__dirname + "/../../config/s3.json");

const s3 = new aws.S3();

const userUpload = userMulter({
  storage: multerS3({
    s3,
    bucket: "bbang-map",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(
        null,
        `images/user/` + Date.now() + "." + file.originalname.split(".").pop()
      );
    },
  }),
});

module.exports = userUpload;
