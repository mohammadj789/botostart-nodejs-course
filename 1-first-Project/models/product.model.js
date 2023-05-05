const products = require("../data/products.json");
const fs = require("fs");
const find = async () => {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
};
const findById = async (id) => {
  return new Promise((resolve, reject) => {
    resolve(products.find((product) => product.id == id));
  });
};
const create = async (product) => {
  return new Promise((resolve, reject) => {
    products.push(product);

    fs.writeFile(
      `${process.cwd()}/data/products.json`,
      JSON.stringify(products),
      (err) => {
        if (err) reject(err);
        else {
          resolve({ message: "new data added", data: product });
        }
      }
    );
  });
};
const update = async (id, payload) => {
  return new Promise((resolve, reject) => {
    products.map((product) => {
      if (product.id == id) {
        Object.assign(product, payload);
      }
      return product;
    });

    fs.writeFile(
      `${process.cwd()}/data/products.json`,
      JSON.stringify(products),
      (err) => {
        if (err) reject(err);
        else {
          resolve({ message: "product updated successfully" });
        }
      }
    );
  });
};
const remove = async (id) => {
  return new Promise((resolve, reject) => {
    console.log(typeof id);

    const filteredProducts = products.filter(
      (product) => product.id != id
    );
    fs.writeFile(
      `${process.cwd()}/data/products.json`,
      JSON.stringify(filteredProducts),
      (err) => {
        if (err) reject(err);
        else {
          resolve({ message: "product deleted successfully" });
        }
      }
    );
  });
};

const ProductModel = { find, findById, create, update, remove };
module.exports = ProductModel;
