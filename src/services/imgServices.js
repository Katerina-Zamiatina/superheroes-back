const fs = require('fs').promises;
const { Storage } = require('@google-cloud/storage');
const { Hero } = require('../db/heroModel');
const Jimp = require('jimp');

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
  return file;
};

const getimgUrl = async file => {
  const options = {
    version: 'v2',
    action: 'read',
    expires: Date.now() + 1000 * 60 * 60,
  };
  const [url] = await storage
    .bucket(bucketName)
    .file(file.filename)
    .getSignedUrl(options);
  return url;
};

const editHeroImg = async filePath => {
  const img = await Jimp.read(filePath);
  await img
    .autocrop()
    .cover(300, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE)
    .quality(75)
    .writeAsync(filePath);
};

const changeImage = async ({ heroId, file }) => {
  if (!file) {
    throw new Error('Please, provide a photo');
  }
  await editHeroImg(file.path);
  await uploadImages(file.path, file.filename).catch(console.error);
  await fs.rm(file.path);
  await getimgUrl(file);
  await Hero.findOneAndUpdate({ _id: heroId }, { $set: { img: url } });
};

module.exports = {
  uploadImages,
  getimgUrl,
  editHeroImg,

  downloadHeroImage,
};

