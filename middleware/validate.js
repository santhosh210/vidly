const sendAlerts = require("../helpers/telegramBot");
module.exports = (validator) => {
  return (req, res, next) => {
    const { error } = validator(req.body);
    if (error) {
      sendAlerts(error.details[0].message);
      return res.status(400).send({ message: error.details[0].message });
    }
    next();
  };
};
