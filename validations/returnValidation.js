const Joi = require("joi");
function validateReturn(req) {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required(),
  });
  return schema.validate(req);
}

module.exports = validateReturn;
