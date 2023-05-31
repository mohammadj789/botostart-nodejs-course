const { default: mongoose } = require("mongoose");
const DB_URI = "mongodb://127.0.0.1:27017/mongoose-toturials";
mongoose.set("strictQuery", true);
mongoose.connect(DB_URI);
mongoose.connection.on("connected", () => {
  console.log("connection to Database has stablished");
});
mongoose.connection.on("error", (err) => {
  console.error("error connecting mongo", err.message);
});
