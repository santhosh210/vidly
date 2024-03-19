const { Worker, QueueEvents, Queue } = require("bullmq");
const client = require("../helpers/cacheFunctions");
const { addToQueue, processQueue } = require("./processQueue");
const events = new QueueEvents("processQueue", { connection: client });

const deadQueue = new Queue("deadQueue", { connection: client });
const results = [];

function add(a, b) {
  return a + b;
}

async function processJob(job) {
  const { data } = job;
  if (typeof data[0] === "number" && typeof data[1] === "number") {
    const result = add(data[0], data[1]);
    results.push(result);
    console.log(result);
  } else {
    await deadQueue.add("deadJob", data);
  }
}

const worker = new Worker(
  "processQueue",
  async (job) => {
    await processJob(job);
  },
  { connection: client }
);

events.on("failed", async (job) => {
  await processQueue.add(job.name, job.data);
});

worker.on("failed", (job, err) => {
  console.error(`Job failed with error ${err.message}`);
});

addToQueue(5, 3);
addToQueue(7, "test");
