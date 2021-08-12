import Joi from '@hapi/joi';

export const registerSchema = Joi.object({
  email: Joi.string().email().min(8).max(254).lowercase().trim().required(),
  firstName: Joi.string().min(1).max(128).trim().required(),
  lastName: Joi.string().min(1).max(128).trim().required(),
});
