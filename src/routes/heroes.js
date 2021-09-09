const express = require('express');
const router = express.Router();

const {
  addHeroValidation,
  updateHeroValidation,
} = require('../middlewares/validation');

const { asyncWrapper } = require('../helpers/apiHelpers');

const upload = require('../helpers/upload');

const {
  getHeroesController,
  getHeroByIdController,
  addHeroController,
  updateHeroController,
  deleteHeroController,
  addImgController,
} = require('../controllers/heroControllers');

router.get('/', asyncWrapper(getHeroesController));
router.get('/:heroId', asyncWrapper(getHeroByIdController));
router.post('/', asyncWrapper(addHeroController));
router.patch('/:heroId', asyncWrapper(updateHeroController));
router.patch('/images', upload.single('image'), asyncWrapper(addImgController));
router.delete('/:heroId', asyncWrapper(deleteHeroController));

module.exports = router;
