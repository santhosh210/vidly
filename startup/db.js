const mongoose = require("mongoose");
const sendAlerts = require("../helpers/telegramBot");

module.exports = function () {
  mongoose
    .connect(
      "mongodb+srv://kondasanthosh210:12345@vidly.cffparb.mongodb.net/vidly",
      {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        connectTimeoutMS: 30000,
        // keepAlive: true,
      }
    )
    .then(() => console.log("Connected to database"))
    .then(() => sendAlerts("Connected to database"))
    .catch((error) => console.error("Error connecting to database:", error));
};
