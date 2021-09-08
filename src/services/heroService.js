const { Hero } = require('../db/heroModel');
const { WrongParametersError } = require('../helpers/errors');

const getHeroes = async ({ page = 0, perPage = 5 }) => {
  const heroes = await Hero.find({})
    .limit(+perPage)
    .skip(+page * +perPage);
  return heroes;
};

const getHeroById = async heroId => {
  const hero = await Hero.findOne({ _id: heroId });
  if (!hero) {
    throw new WrongParametersError(`Fail, no hero with id ${heroId}`);
  }
  return hero;
};

const addHero = async body => {
  const newHero = await Hero.create({ ...body });
  return newHero;
};

const updateHero = async (heroId, body) => {
  const updatedHero = await Hero.findByIdAndUpdate(heroId, body, { new: true });
  return updatedHero;
};

const deleteHero = async heroId => {
  await Hero.findByIdAndRemove(heroId);
};

module.exports = {
  getHeroes,
  getHeroById,
  addHero,
  updateHero,
  deleteHero,
};
