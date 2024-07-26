import * as Joi from 'joi';

export const CatSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().min(0).required(),
  breed: Joi.string().optional(),
});
