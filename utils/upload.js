const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

function upload() {
  const mongodbUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_USER_PWD}@cluster0.vlhig1a.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
  const storage = new GridFsStorage({
    url: mongodbUrl,
    file: (req, file) => {
      return new Promise((resolve, _reject) => {
        const fileInfo = {
          filename: file.originalname,
          bucketName: "filesBucket",
        };
        resolve(fileInfo);
      });
    },
  });

  return multer({ storage });
}

module.exports = { upload };
