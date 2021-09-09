const { modelNames } = require('mongoose');
const {
  getHeroes,
  getHeroById,
  addHero,
  updateHero,
  deleteHero,
} = require('../services/heroService');

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

  if (!result) return res.status(404).json({ message: 'Not found' });

  res.status(200).json({ message: 'Hero was successfully deleted' });
};

module.exports = {
  getHeroesController,
  getHeroByIdController,
  addHeroController,
  updateHeroController,
  deleteHeroController,
};
