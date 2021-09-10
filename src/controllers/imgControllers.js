const { downloadHeroImage } = require('../services/imgServices');

const uploadController = async (req, res) => {
  res.json({ status: 'success' });
};

const downloadController = async (req, res) => {
  const { filename } = req.params;
  await downloadHeroImage(filename).catch(console.error);
  res.status(200).json({ status: 'success' });
};

module.exports = {
  uploadController,
  downloadController,
};

// require('dotenv').config();

// const editHeroImg = require('../helpers/editImage');
// const { addImage } = require('../services/filesServices');

// const uploadController = async (req, res) => {
//   const img = await addImage(req.body);
//   res.json({ img, status: 'success' });
// };

// module.exports = {
//   uploadController,
// };
