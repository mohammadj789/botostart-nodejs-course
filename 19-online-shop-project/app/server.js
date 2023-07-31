module.exports = class Application {
  #express = require("express");
  #app = this.#express();
  #PORT;
  #DB_URL;

  constructor(PORT, DB_URL) {
    this.#PORT = PORT;
    this.#DB_URL = DB_URL;
    this.configApplication();
    this.configRedis();
    this.configDatabase();
    this.configServer();
    this.configRoutes();
    this.errorHandler();
  }
  configApplication() {
    const morgan = require("morgan");
    const path = require("path");
    const swaggerUI = require("swagger-ui-express");
    const swaggerJsDoc = require("swagger-jsdoc");
    const cors = require("cors");
    this.#app.use(cors());
    this.#app.use(morgan("dev"));
    this.#app.use(this.#express.json());
    this.#app.use(this.#express.urlencoded({ extended: true }));
    this.#app.use(
      this.#express.static(path.join(__dirname, "..", "public"))
    );
    this.#app.use(
      "/api-doc",
      swaggerUI.serve,
      swaggerUI.setup(
        swaggerJsDoc({
          swaggerDefinition: {
            openapi: "3.0.0",
            info: {
              title: "online shop",
              version: "1.0.0",
              description:
                "online shop with lots of features \n eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEzNTUxOTQwOSIsImlhdCI6MTY5MDcyNzIxOSwiZXhwIjoxNzIyMjg0ODE5fQ.5oKCXxZSmiL68tJxCp7Ar6RXvD3OkhGFNBfVDf-7r7A",
              contact: {
                email: "mohammadsoltanian10@gmail.com",
                name: "mohammadjavad soltanian",
              },
            },
            servers: [{ url: `http://localhost:${this.#PORT}` }],
            components: {
              securitySchemes: {
                BearerAuth: {
                  type: "http",
                  scheme: "bearer",
                  bearerFormat: "JWT",
                },
              },
            },
            security: [
              {
                BearerAuth: [],
              },
            ],
          },
          apis: ["./app/router/*/*.js", "./app/router/*.js"],
        }),
        { explorer: true }
      )
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
  configRedis() {
    const redisClient = require("./utils/init_redis");
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
