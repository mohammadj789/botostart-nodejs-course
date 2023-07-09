require("dotenv").config();
const Application = require("./app/app");
const DB_URL = "mongodb://127.0.0.1:27017/auth-project";
const app = new Application(3000, DB_URL);
