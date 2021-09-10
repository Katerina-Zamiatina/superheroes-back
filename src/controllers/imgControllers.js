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
