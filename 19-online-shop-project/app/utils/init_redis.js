const redisDB = require("redis");
const redisClient = redisDB.createClient(6363, "localhost");
redisClient.connect();
redisClient.on("connect", () => console.log("connect to redis"));
redisClient.on("ready", () => console.log("redis is connected"));
redisClient.on("error", (err) =>
  console.log("redis error: ", err.message)
);
redisClient.on("end", () => console.log("disconnected from redis"));
module.exports = redisClient;
