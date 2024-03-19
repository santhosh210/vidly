const sendAlerts = require("../helpers/telegramBot");
module.exports = function (handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (ex) {
      sendAlerts(ex);
      next(ex);
    }
  };
};
