const {
  find,
  findById,
  create: createProduct,
  update: updateProduct,
  remove: removeProduct,
} = require("../models/product.model");

const get = async (req, res) => {
  try {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(await find()));
    res.end();
  } catch (error) {
    console.log(error);
  }
};
const create = async (req, res) => {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      const product = { id: Date.now(), ...JSON.parse(body) };

      const result = await createProduct(product);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.write(JSON.stringify(result));
      res.end();
    });
  } catch (error) {
    console.log(error);
  }
};
const update = async (req, res) => {
  try {
    const [, , , id] = req.url.split("/");
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      const parsedBody = JSON.parse(body);
      const product = await findById(id);
      if (!product) {
        res.writeHead(404, {
          "Content-Type": "application/json",
        });
        res.write(JSON.stringify({ message: "Product not Found" }));
        res.end();
      } else {
        const result = await updateProduct(id, parsedBody);
        console.log(result);

        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(result));
        res.end();
      }
    });
  } catch (error) {
    console.log(error);
  }
};
const remove = async (req, res) => {
  try {
    const [, , , id] = req.url.split("/");

    const product = await findById(id);
    if (!product) {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });
      res.write(JSON.stringify({ message: "Product not Found" }));
      res.end();
    } else {
      const result = await removeProduct(id);
      console.log(result);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(result));
      res.end();
    }
  } catch (error) {
    console.log(error);
  }
};
const getById = async (req, res) => {
  try {
    const [, , , id] = req.url.split("/");
    const product = await findById(id);

    if (!product) {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });
      res.write(JSON.stringify({ message: "Product not Found" }));
      res.end();
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.write(JSON.stringify(product));
      res.end();
    }
  } catch (error) {
    console.log(error);
  }
};
const productController = { get, getById, create, update, remove };
module.exports = productController;
//(^[a-z]+)([a-z0-9\.\_]{3,})\@([a-z]{3,8})\.([a-z]{3,8}) email
//^[a-zA-Z]{1,1}[a-zA-Z0-9\.\-]{3,25} username
// (\+)?(\d{2,3})?(0)?(\d{3})([- ])?(\d{3})([- ])?(\d{4}) number
