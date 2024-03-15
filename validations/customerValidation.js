const Joi = require("joi");

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(25).required(),
    phone: Joi.string().min(5).max(25).required(),
    isGold: Joi.boolean(),
  });
  return schema.validate(customer);
}

module.exports = validateCustomer;
