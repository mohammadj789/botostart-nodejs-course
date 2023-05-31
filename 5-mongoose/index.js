const express = require("express");
const {
  ErrorHandler,
  NotFoundError,
} = require("./util/errorHandler");
const { BlogModel } = require("./model/blog.model");
const { isValidObjectId } = require("mongoose");
const omitEmpty = require("omit-empty");
require("./config/mongo.config");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hi");
});
app.post("/save", async (req, res, next) => {
  try {
    const { title, text } = req.body;

    const result = new BlogModel({ title, text });
    await result.save();
    res.send(result);
  } catch (error) {
    next(error);
  }
});
app.post("/create", async (req, res, next) => {
  try {
    const { title, text } = req.body;

    const result = await BlogModel.create({ title, text });

    res.send(result);
  } catch (error) {
    next(error);
  }
});
app.post("/insertMany", async (req, res, next) => {
  try {
    const { title, text } = req.body;

    const result = await BlogModel.insertMany([
      { title, text },
      { title, text },
      { title, text },
      { title, text },
    ]);

    res.send(result);
  } catch (error) {
    next(error);
  }
});
app.get("/blogs", async (req, res, next) => {
  try {
    const blogs = await BlogModel.find({});
    res.send(blogs);
  } catch (error) {
    next(error);
  }
});
app.get("/blogs/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    if (!isValidObjectId(_id))
      throw { status: 400, message: "Unvalid id" };
    const blog = await BlogModel.find({ _id });
    res.send(blog);
  } catch (error) {
    next(error);
  }
});
app.delete("/blogs/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    if (!isValidObjectId(_id))
      throw { status: 400, message: "Unvalid id" };
    // const blog = await BlogModel.deleteOne({ _id });
    const blog = await BlogModel.deleteMany({});
    res.send(blog);
  } catch (error) {
    next(error);
  }
});
app.put("/blogs/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    if (!isValidObjectId(_id))
      throw { status: 400, message: "Unvalid id" };
    const blog = await BlogModel.findOne({ _id });
    if (!blog) throw { status: 404, message: "blog not found" };

    const newBodyObject = omitEmpty(req.body);
    Object.assign(blog, newBodyObject);
    await blog.save();
    res.send(blog);
  } catch (error) {
    next(error);
  }
});
app.patch("/blogs/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    if (!isValidObjectId(_id))
      throw { status: 400, message: "Unvalid id" };
    // const blog = await BlogModel.findOne({ _id });
    // if (!blog) throw { status: 404, message: "blog not found" };

    const newBodyObject = omitEmpty(req.body);

    // const result = await BlogModel.updateOne(
    //   { _id },
    //   { $set: newBodyObject }
    // );
    const blog = await BlogModel.findOneAndUpdate(
      { _id },
      { $set: newBodyObject }
    );
    res.send(blog);
  } catch (error) {
    next(error);
  }
});
app.use(ErrorHandler);
app.use(NotFoundError);
app.listen(3000, () =>
  console.log("server is running on port 3000: http://localhost:3000")
);
