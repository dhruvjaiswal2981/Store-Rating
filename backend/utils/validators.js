const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(20).max(60).required(),
  email: Joi.string().email().required(),
  address: Joi.string().max(400).required(),
  password: Joi.string().pattern(new RegExp('^(?=.*[A-Z])(?=.*[!@#$&*]).{8,16}$')).required()
});

const ratingSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required()
});

module.exports = { userSchema, ratingSchema };
