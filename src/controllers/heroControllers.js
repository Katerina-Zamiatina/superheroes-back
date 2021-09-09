const fs = require('fs').promises;
const path = require('path');

require('dotenv').config();

const {
  getHeroes,
  getHeroById,
  addHero,
  updateHero,
  deleteHero,
  addImg,
} = require('../services/heroService');

const { changeImage } = require('../services/filesServices');

// const editHeroImg = require('../helpers/editImage');

// const PORT = process.env.PORT;
// const IMG_DIR = path.join(
//   process.cwd(),
//   process.env.PUBLIC_DIR,
//   process.env.IMG_DIR,
// );

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

  res.status(200).json({ message: 'Hero was successfully deleted' });
};

const addImgController = async (req, res) => {
  const { file } = req;
  const { heroId } = req;
  const img = await changeImage({ heroId, file });
  res.json({ status: 'success', img });
};

// const addImgController = async (req, res) => {
//   const filePath = req.file.path;
//   const fileName = req.file.filename;
//   if (req.file) {
//     await editHeroImg(filePath);
//     await fs.rename(filePath, path.join(IMG_DIR, fileName));
//     const newImgUrl = `http://localhost:${PORT}/${process.env.IMG_DIR}/${fileName}`;
//     const url = await addImg(req.params.heroId, newImgUrl);
//     res.status(200).json({ img: url, status: 'success' });
//   }
//   res
//     .status(400)
//     .json({ message: 'Invalid file. Possible extensions: jpeg, png, jpg' });
// };

module.exports = {
  getHeroesController,
  getHeroByIdController,
  addHeroController,
  updateHeroController,
  deleteHeroController,
  addImgController,
};
