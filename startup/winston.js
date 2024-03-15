// const winston = require("winston");
// // require("winston-mongodb");
// require("express-async-errors");

// const logger = winston.createLogger({
//   // format: winston.format.prettyPrint({ colorize: true }),
//   transports: [
//     new winston.transports.File({ filename: "logFile.log", level: "error" }),
//     new winston.transports.Console({ level: "error" }),
//     new winston.transports.Console({ level: "info" }),
//     // new winston.transports.MongoDB({
//     //   db: "mongodb://localhost:27017/vidly",
//     //   options: { useUnifiedTopology: true },
//     // }),
//   ],
// });
// process.on("uncaughtException", (ex) => {
//   logger.error("uncaughtException");
// });
// process.on("uncaughtRejection", (ex) => {
//   logger.error("uncaughtRejection");
// });
// //exceptionHandler
// //rejection handler

// module.exports = logger;
