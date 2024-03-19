// processQueue.js
const { Queue } = require("bullmq");
const client = require("../helpers/cacheFunctions");

const processQueue = new Queue("processQueue", { connection: client });

async function addToQueue(a, b) {
  await processQueue.add("addition", [a, b]);
}

module.exports = {
  addToQueue,
  processQueue,
};
