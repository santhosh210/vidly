const express = require("express");
// const logger = require("./startup/winston");
const cacheFunctions = require("./helpers/cacheFunctions");
const sendAlerts = require("./helpers/telegramBot");

const app = express();
app.get("/", (req, res) => res.send("Welcome to vidly!!!"));

require("./startup/winston");
require("./helpers/telegramBot");
require("./startup/routes")(app);
require("./helpers/cacheFunctions");
require("./startup/db")();
require("./startup/validation")();
require("./startup/prod")(app); //prod only

const server = app.listen(3001, () => {
  // logger.info("Server is running on port");
  sendAlerts("Application running on port");

  console.log("Running on port");
});

module.exports = server;
