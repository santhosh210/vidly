const logger = require("./winston");
const mongoose = require("mongoose");
module.exports = function () {
  mongoose
    // .connect("mongodb://localhost:27017/vidly-test")
    .connect("mongodb://localhost:27017/vidly")
    .then(() => logger.info("Connected to database"));
};
