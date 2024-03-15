const Joi = require("joi");

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(3).max(100).required(),
    password: Joi.string().min(3).max(255).required(),
  });
  return schema.validate(user);
}

module.exports = validateUser;
