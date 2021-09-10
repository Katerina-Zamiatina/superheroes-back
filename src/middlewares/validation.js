const Joi = require('joi');

const { ValidationError } = require('../helpers/errors');

const checkValidation = (schema, req, res, next) => {
  const validationResult = schema.validate(req.body);
  if (validationResult.error)
    next(new ValidationError(validationResult.error.details));
  next();
};

const addHeroValidation = (req, res, next) => {
  const schema = Joi.object({
    nickname: Joi.string().alphanum().min(2).max(30).required(),
    realName: Joi.string().alphanum().min(2).max(30).required(),
    originalDescription: Joi.string().alphanum().min(10).max(300).required(),
    superpowers: Joi.string().alphanum().min(4).max(200).required(),
    catchPhrase: Joi.string().alphanum().min(4).max(30).required(),
    img: Joi.string().alphanum().min(10).max(200).required(),
  });
  checkValidation(schema, req, res, next);
};

const updateHeroValidation = (req, res, next) => {
  const schema = Joi.object({
    nickname: Joi.string().alphanum().min(2).max(30).optional(),
    realName: Joi.string().alphanum().min(2).max(30).optional(),
    originalDescription: Joi.string().alphanum().min(10).max(300).optional(),
    superpowers: Joi.string().alphanum().min(4).max(200).optional(),
    catchPhrase: Joi.string().alphanum().min(4).max(30).optional(),
    img: Joi.string().alphanum().min(10).max(200).optional(),
  });
  checkValidation(schema, req, res, next);
};

module.exports = {
  addHeroValidation,
  updateHeroValidation,
};
