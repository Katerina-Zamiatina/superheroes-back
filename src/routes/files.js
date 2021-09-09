const express = require('express');
const router = new express.Router();
const { asyncWrapper } = require('../helpers/apiHelpers');
const { downloadController } = require('../controllers/filesControllers');

const upload = require('../helpers/upload');
const { addImgController } = require('../controllers/heroControllers');

router.patch('/images', upload.single('image'), asyncWrapper(addImgController));
router.use('/download/:filename', asyncWrapper(downloadController));

module.exports = router;
