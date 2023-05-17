const { MongoClient } = require("mongodb");

module.exports = class ConnectToMongoDB {
  #DB_URI = "mongodb://127.0.0.1:27017/firstProject-products";
  #db = null;
  async #connect() {
    try {
      const client = new MongoClient(this.#DB_URI);
      let db = client.db();
      return db;
    } catch (error) {
      console.log(error.message);
    }
  }
  async get() {
    try {
      if (this.#db) {
        console.log("db connection is already alive");
        return this.#db;
      }
      this.#db = await this.#connect();
      return this.#db;
    } catch (error) {
      console.log(error.message);
    }
  }
};
// async function main() {
//   const db = await new ConnectToMongoDB().get();
//   const users = await db.collection("user").find({}).toArray();
//   console.log(users);
// }
// main();
