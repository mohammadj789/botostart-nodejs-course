const { allRoutes } = require("./router/router");

module.exports = class Application {
  #express = require("express");
  #app = this.#express();

  constructor(PORT, DB_URL) {
    this.configApplication();
    this.createServer(PORT);
    this.configDatabase(DB_URL);
    this.createRouters();
    this.errorHandler();
  }
  configApplication() {
    const path = require("path");
    this.#app.use(this.#express.json());
    this.#app.use(this.#express.urlencoded({ extended: true }));
    this.#app.use(
      this.#express.static(path.join(__dirname, "..", "public"))
    );
  }
  createServer(PORT) {
    const http = require("http");
    const server = http.createServer(this.#app);
    server.listen(PORT, () =>
      console.log(
        `server is running on port ${PORT}.http://localhost:${PORT}`
      )
    );
  }
  configDatabase(DB_URL) {
    const mongoose = require("mongoose");
    mongoose
      .connect(DB_URL)
      .then(() => console.log("Database connected successfully"))
      .catch((error) => {
        throw error;
      });
  }
  errorHandler() {
    this.#app.use((req, res, next) => {
      return res.status(404).send({
        status: 404,
        success: false,
        message: "the page you are trying to access is not found",
      });
    });
    this.#app.use((err, req, res, next) => {
      const status = err?.status || err?.statusCode || 500;
      const message = err?.message || "InternalServerError";
      return res.status(status).send({
        status,
        success: false,
        message,
      });
    });
  }
  createRouters() {
    this.#app.get("/", (req, res, next) => {
      return res.send({ message: "this i a new express" });
    });
    this.#app.use(allRoutes);
    // this.#app.use((err, req, res, next) => {
    //   try {
    //   } catch (error) {
    //     next(error);
    //   }
    // });
  }
};
