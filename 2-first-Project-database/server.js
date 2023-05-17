const http = require("http");

const {
  get,
  getById,
  create,
  update,
  remove,
} = require("./controller/product.controller");
const { notFound } = require("./controller/errorHandler.controller");
const PORT = 3000;
const server = http.createServer((req, res) => {
  const apiRoute = "/api";
  const productsRoute = `${apiRoute}/products`;
  const singleProductRoute = /\/api\/products\/[0-9a-z]+/;
  const { url, method } = req;

  if (url === productsRoute && method === "GET") {
    get(req, res);
  } else if (url.match(singleProductRoute) && method === "GET") {
    getById(req, res);
  } else if (url === productsRoute && method === "POST") {
    create(req, res);
  } else if (url.match(singleProductRoute) && method === "PATCH") {
    update(req, res);
  } else if (url.match(singleProductRoute) && method === "DELETE") {
    remove(req, res);
  } else {
    notFound(res);
  }
});
server.listen(PORT, () => {
  console.log(
    `server run on port ${PORT} : http://localhost:${PORT}`
  );
});
