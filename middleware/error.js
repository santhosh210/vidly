// const logger = require("../startup/winston");
const sendAlerts = require("../helpers/telegramBot");
module.exports = function (err, req, res, next) {
  // logger.error("error", err.message);
  sendAlerts("Something Failed");
  res.status(500).send("Something Failed");
};
