const Joi = require("joi");

function validateAuth(req) {
  const schema = Joi.object({
    email: Joi.string().min(3).max(100).required(),
    password: Joi.string().min(3).max(255).required(),
  });
  return schema.validate(req);
}

module.exports = validateAuth;
