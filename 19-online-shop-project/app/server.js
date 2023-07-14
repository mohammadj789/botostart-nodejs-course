module.exports = class Application {
  #express = require("express");
  #app = this.#express();
  #PORT;
  #DB_URL;

  constructor(PORT, DB_URL) {
    this.#PORT = PORT;
    this.#DB_URL = DB_URL;
    this.configApplication();
    this.configDatabase();
    this.configServer();
    this.configRoutes();
    this.errorHandler();
  }
  configApplication() {
    const morgan = require("morgan");
    const path = require("path");
    this.#app.use(morgan("dev"));
    this.#app.use(this.#express.json());
    this.#app.use(this.#express.urlencoded({ extended: true }));
    this.#app.use(
      this.#express.static(path.join(__dirname, "..", "public"))
    );
  }
  configServer() {
    const http = require("http");
    const server = http.createServer(this.#app);

    server.listen(this.#PORT, () =>
      console.log(
        `Server is running on port ${this.#PORT}. http://localhost:${
          this.#PORT
        }`
      )
    );
  }
  configDatabase() {
    const { default: mongoose } = require("mongoose");
    mongoose.connect(this.#DB_URL);

    mongoose.connection.on("connected", () =>
      console.log("Connection to database is established")
    );
    mongoose.connection.on("error", () =>
      console.log("connection to database is intrupt")
    );
    process.on("SIGINT", async () => {
      await mongoose.connection.close();

      process.exit(0);
    });
  }
  configRoutes() {
    const { AllRoutes } = require("./router/routes");
    this.#app.use(AllRoutes);
  }
  errorHandler() {
    const createError = require("http-errors");
    this.#app.use((req, res, next) =>
      next(createError.NotFound("Not Found Page"))
    );
    this.#app.use((err, req, res, next) => {
      const defaultServerError = createError.InternalServerError();
      const status =
        err.status || err.statusCode || defaultServerError.status;
      const message =
        err.message || err.msg || defaultServerError.message;

      return res.status(status).json({ errors: { status, message } });
    });
  }
};
