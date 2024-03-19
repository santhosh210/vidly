const jwt = require("jsonwebtoken");
const sendAlerts = require("../helpers/telegramBot");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    sendAlerts("Access Denied. No token provided.");
    res.status(401).send("Access Denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, "privateKey");
    req.user = decoded;
    next();
  } catch (ex) {
    sendAlerts("Invalid Token");
    res.status(400).send("Invalid Token");
  }
};
