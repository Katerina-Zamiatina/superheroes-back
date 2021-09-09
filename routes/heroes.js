const express = require('express');
const router = express.Router();

const {
  addHeroValidation,
  updateHeroValidation,
} = require('../src/middlewares/validation');

const { asyncWrapper } = require('../src/helpers/apiHelpers');

const {
  getHeroesController,
  getHeroByIdController,
  addHeroController,
  updateHeroController,
  deleteHeroController,
} = require('../src/controllers/heroControllers');

router.get('/', asyncWrapper(getHeroesController));
router.get('/:heroId', asyncWrapper(getHeroByIdController));
router.post('/', addHeroValidation, asyncWrapper(addHeroController));
router.patch(
  '/:heroId',
  updateHeroValidation,
  asyncWrapper(updateHeroController),
);
router.delete('/:heroId', asyncWrapper(deleteHeroController))

module.exports = router;
