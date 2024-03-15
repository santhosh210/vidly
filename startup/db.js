// // const logger = require("./winston");
// const mongoose = require("mongoose");
// module.exports = function () {
//   mongoose
//     // .connect("mongodb://localhost:27017/vidly-test")

//     .connect(
//       "mongodb://0.0.0.0:27017/vidly",
//       { useUnifiedTopology: true },
//       { useNewUrlParser: true },
//       { connectTimeoutMS: 30000 },
//       { keepAlive: 1 }
//     )
//     // .then(() => logger.info("Connected to database"));
//     .then("connected to db");
// };
const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect(
      "mongodb+srv://kondasanthosh210:12345@vidly.cffparb.mongodb.net/?retryWrites=true/vidly",
      {
        connectTimeoutMS: 30000,
      }
    )
    .then(() => console.log("Connected to database"))
    .catch((error) => console.error("Error connecting to database:", error));
};
