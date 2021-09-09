const { Storage } = require('@google-cloud/storage');
const fs = require('fs').promises;
const jimp = require('jimp');

const { Hero } = require('../db/heroModel');

const storage = new Storage();
const bucketName = 'superheroes-test';

const uploadImages = async (filePath, fileName) => {
  await storage.bucket(bucketName).upload(filePath, { destinaion: fileName });
};

const downloadHeroImage = async fileName => {
  await storage
    .bucket(bucketName)
    .file(fileName)
    .download({ destination: `./tmp/${fileName}` });
};

const changeImage = async ({ heroId, file }) => {
  if (!file) {
    throw new Error('Please, provide a photo');
  }
  const img = await jimp.read(file.path);
  await img
    .autocrop()
    .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE)
    .quality(75)
    .writeAsync(file.path);

  await uploadImages(file.path, file.filename).catch(console.error);
  await fs.rm(file.path);
  const options = {
    version: 'v2',
    action: 'read',
    expires: Date.now() + 1000 * 60 * 60,
  };

  const [url] = await storage
    .bucket(bucketName)
    .file(file.filename)
    .getSignedUrl(options);

  await Hero.findOneAndUpdate({ _id: heroId }, { $set: { img: url } });
  return url;
};

module.exports = {
  downloadHeroImage,
  changeImage,
};

// const Image = require('../db/imageModel');

// const getImage = async () => {
//   const images = await Image.find({});
//   return images;
// };

// const addImage = async name => {
//   const newImg = new Image(name);
//   newImg.img.data = req.file.image.buffer;
//   newImg.img.contentType = 'image/jpg' || 'image/jpeg' || 'image/png';
//   await newImg.save();
//   return newImg;
// };

// module.exports = { addImage };
