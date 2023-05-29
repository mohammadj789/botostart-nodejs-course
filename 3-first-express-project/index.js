const express = require("express");
const queryString = require("querystring");
const posts = require("./post.json");
const morgan = require("morgan");
const omitEmpty = require("omit-empty");
const camelCase = (...args) =>
  import("camelcase-keys").then(({ default: camelCaseKeys }) =>
    camelCaseKeys(...args)
  );
const app = express();
app.use(
  morgan(":method :url :res[content-length] :response-time ms")
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = [
  { id: 1, name: "user 1" },
  { id: 2, name: "user 2" },
  { id: 3, name: "user 3" },
];
const products = [
  { id: 1, name: "product 1" },
  { id: 2, name: "product 2" },
  { id: 3, name: "product 3" },
];
app.get("/", (req, res) => res.send({ message: number }));
app.get("/users", (req, res) =>
  res.send({
    users,
  })
);
//paraps
app.get("/products/:id?", (req, res) => {
  const { id } = req.params;
  let product = null;

  if (id) {
    product = products.find((product) => product.id == id);
    return res.send(product);
  }

  res.send({
    products,
  });
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id == id);
  if (!user) {
    res.status(404).json({
      statusCode: res.statusCode,
      error: "user not found",
    });
  } else {
    res.status(404).json({
      statusCode: res.statusCode,
      data: user,
    });
  }
});
//regular expression
app.get("/file.txt", (req, res) =>
  res.send({ message: "contain ." })
);
app.get("/ab?cd", (req, res) => res.send({ message: "optional b" }));
app.get("/ab+cf", (req, res) => res.send({ message: "repeative b" }));
app.get("/ab*ch", (req, res) =>
  res.send({ message: "everything between" })
);
app.get("/ab(gl)?cp", (req, res) =>
  res.send({ message: "optional groupe" })
);
// app.get(/a/, (req, res) =>
//   res.send({ message: "everything containing a" })
// );
app.get(/[a-z0-9]+\@[a-z]+\.[a-z]+/, (req, res) =>
  res.send({ message: "email " })
);
app.get(/.*nodejs$/, (req, res) =>
  res.send({ message: "endding with node js " })
);
app.get("/queryExample", (req, res) => {
  const query = req.query;
  console.log(queryString.parse("?key1=dfdf&key2=asdasd"));
  console.log(
    queryString.stringify({ key1: "dfdf", key2: "asdasd" })
  );
  res.send(query);
});
app.get("/posts", (req, res) => {
  const { title, desc } = req.query;
  const titleExpression = new RegExp(title ?? null, "gi");

  const descriptionExpression = new RegExp(desc ?? null, "gi");
  const filter = posts.filter(
    (post) =>
      post.title.match(titleExpression) ||
      post.body.match(descriptionExpression)
  );
  res.send({ posts: filter });
});
//post method
app.post("/body", (req, res) => {
  res.send(req.body);
});
const clamelCaseConvertor = async (req, res, next) => {
  req.body = await camelCase(req.body, { deep: true });
  req.query = await camelCase(req.query);
  req.params = await camelCase(req.params);
  next();
};
const removeEmptyFields = (options) => {
  return (req, res, next) => {
    req.body = omitEmpty(req.body);
    next();
  };
};
app.get("/camel", clamelCaseConvertor, async (req, res, next) => {
  try {
    res.send({
      body: req.body,
      query: req.query,
      params: req.params,
    });
  } catch (error) {
    next(error);
  }
});
app.post("/omit", removeEmptyFields(), (req, res) => {
  res.send(req.body);
});
app.use((err, req, res, next) => {
  return res.send({
    statusCode: err.status || 500,
    error: {
      message: err.message || "InternalServerError",
    },
  });
});
app.use((req, res, next) => {
  return res.status(404).send({
    statusCode: res.statusCode,
    error: {
      type: "NotFound",
      message: `${req.url} is not a valid route`,
    },
  });
});

app.listen(3000, () =>
  console.log(`server is running on port 3000: http://localhost:3000`)
);
