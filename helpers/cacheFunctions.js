const Redis = require("redis");
const sendAlerts = require("../helpers/telegramBot");
const client = Redis.createClient({
  // host: "localhost",
  host: "red-c6na6rjru51t7lilgs3g",
  port: 6379,
});

(async () => await client.connect())();

client.on("connect", () => {
  console.log("Connected to Redis");
  sendAlerts("connected to Redis");
});

client.on("error", function (error) {
  console.error("Error connecting to Redis:", error);
});

const setValue = async (key, value) => {
  try {
    await client.set(key, value);
    console.log(`Value set for key ${key}`);
  } catch (error) {
    console.error(`Error setting value for key ${key}:`, error);
    throw error;
  }
};

const getValue = async (key) => {
  try {
    const value = await client.get(key);
    console.log(`Value retrieved for key ${key}:`, value);
    return value;
  } catch (error) {
    // console.error(`Error getting value for key ${key}:`, error);
    throw error;
  }
};

const deleteValue = async (key) => {
  try {
    const result = await client.del(key);
    console.log(
      `Key ${key} deleted successfully:`,
      result === 1 ? "Deleted" : "Not found"
    );
    return result === 1;
  } catch (error) {
    console.error(`Error deleting value for key ${key}:`, error);
    throw error;
  }
};

const deleteAll = async () => {
  try {
    const result = await client.flushall();
    console.log("All keys deleted successfully:", result);
    return result;
  } catch (error) {
    console.error("Error deleting all keys:", error);
    throw error;
  }
};
const hsetField = async (key, field, value) => {
  try {
    const result = await client.hset(key, field, value);
    console.log(`Field ${field} set for key ${key}`);
    return result;
  } catch (error) {
    console.error(`Error setting field ${field} for key ${key}:`, error);
    throw error;
  }
};

const hgetField = async (key, field) => {
  try {
    const value = await client.hget(key, field);
    console.log(`Value retrieved for field ${field} of key ${key}:`, value);
    return value;
  } catch (error) {
    console.error(
      `Error getting value for field ${field} of key ${key}:`,
      error
    );
    throw error;
  }
};

const hdelField = async (key, field) => {
  try {
    const result = await client.hdel(key, field);
    console.log(
      `Field ${field} deleted from key ${key}:`,
      result === 1 ? "Deleted" : "Not found"
    );
    return result === 1;
  } catch (error) {
    console.error(`Error deleting field ${field} from key ${key}:`, error);
    throw error;
  }
};

const expireKey = async (key, seconds) => {
  try {
    const result = await client.expire(key, seconds);
    console.log(`Key ${key} set to expire in ${seconds} seconds.`);
    return result;
  } catch (error) {
    console.error(`Error setting expiry for key ${key}:`, error);
    throw error;
  }
};

const ttlKey = async (key) => {
  try {
    const result = await client.ttl(key);
    console.log(`Time to live (TTL) for key ${key} is ${result} seconds.`);
    return result;
  } catch (error) {
    console.error(`Error getting TTL for key ${key}:`, error);
    throw error;
  }
};
module.exports = {
  client,
  setValue,
  getValue,
  deleteValue,
  deleteAll,
  hsetField,
  hgetField,
  hdelField,
  expireKey,
  ttlKey,
};
