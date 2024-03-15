const express = require("express");
const logger = require("./startup/winston");

const app = express();

require("./startup/winston");
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/validation")();
require("./startup/prod")(app); //prod only
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  logger.info("Server is running on port 3001");
});

module.exports = server;
