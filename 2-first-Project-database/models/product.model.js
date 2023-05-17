const fs = require("fs");
const ConnectToMongoDB = require("../util/mongo-connection");
const { ObjectId } = require("mongodb");
const productCollection = "products";
const find = async () => {
  const db = await new ConnectToMongoDB().get();
  return new Promise(async (resolve, reject) => {
    const products = await db
      .collection(productCollection)
      .find({}, { sort: { id: -1 } })
      .toArray();
    console.log(products);

    resolve(products);
  });
};
const findById = async (id) => {
  const db = await new ConnectToMongoDB().get();
  return new Promise(async (resolve, reject) => {
    const product = await db
      .collection(productCollection)
      .findOne({ _id: new ObjectId(id) });
    resolve(product);
  });
};
const create = async (product) => {
  const db = await new ConnectToMongoDB().get();
  return new Promise(async (resolve, reject) => {
    const result = await db
      .collection(productCollection)
      .insertOne(product);
    resolve(result);
  });
};
const update = async (id, payload) => {
  const db = await new ConnectToMongoDB().get();
  return new Promise(async (resolve, reject) => {
    const result = await db
      .collection(productCollection)
      .updateOne({ _id: new ObjectId(id) }, { $set: { ...payload } });
    resolve(result);
  });
};
const remove = async (id) => {
  const db = await new ConnectToMongoDB().get();
  return new Promise(async (resolve, reject) => {
    const result = await db
      .collection(productCollection)
      .deleteOne({ _id: new ObjectId(id) });
    resolve(result);
  });
};

const ProductModel = { find, findById, create, update, remove };
module.exports = ProductModel;
