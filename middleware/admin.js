const sendAlerts = require("../helpers/telegramBot");
module.exports = function (req, res, next) {
  if (!req.user.isAdmin) {
    sendAlerts("Access denied");

    return res.status(403).send({ message: "Access denied" });
  }
  next();
};
