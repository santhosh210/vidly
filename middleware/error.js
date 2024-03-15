// const logger = require("../startup/winston");
module.exports = function (err, req, res, next) {
  // logger.error("error", err.message);
  res.status(500).send("Something Failed");
};
