const fs = require('fs').promises;
require('dotenv').config();

const {
  getHeroes,
  getHeroById,
  addHero,
  updateHero,
  deleteHero,
  updateImg,
} = require('../services/heroService');

const {
  uploadImages,
  editHeroImg,
  getimgUrl,
} = require('../services/imgServices');

const getHeroesController = async (req, res) => {
  const { page, perPage } = req.query;

  const heroes = await getHeroes({ page, perPage });

  res
    .status(200)
    .json({ heroes, pagination: { page, perPage }, status: 'success' });
};

const getHeroByIdController = async (req, res) => {
  const { heroId } = req.params;
  const hero = await getHeroById(heroId);

  res.status(200).json({ hero, status: 'success' });
};

const addHeroController = async (req, res) => {
  const newHero = await addHero(req.body);

  res.status(201).json({ newHero, status: 'success' });
};

const updateHeroController = async (req, res) => {
  const { heroId } = req.params;

  const updatedHero = await updateHero(heroId, req.body);

  if (!updatedHero) return res.status(404).json({ message: 'Not found' });

  res.status(200).json({ updatedHero, status: 'success' });
};

const deleteHeroController = async (req, res) => {
  const result = await deleteHero(req.params.heroId);

  res.status(200).json({ message: 'Hero was successfully deleted', result });
};

const updateImgController = async (req, res) => {
  const { heroId } = req.params;
  const { file } = req;
  const filePath = req.file.path;
  const fileName = req.file.filename;
  if (req.file) {
    await editHeroImg(filePath);
    await uploadImages(filePath, fileName);
    // await fs.rm(file.path);
    const newUrl = await getimgUrl(file);
    await updateImg(heroId, newUrl);
    res.status(200).json({ img: newUrl, status: 'success' });
  }
  res
    .status(400)
    .json({ message: 'Invalid file. Possible extensions: jpeg, png, jpg' });
};

module.exports = {
  getHeroesController,
  getHeroByIdController,
  addHeroController,
  updateHeroController,
  deleteHeroController,
  updateImgController,
};
