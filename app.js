const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const blogsRouter = require("./controllers/blog");
const logger = require("./utils/logger");
const config = require("./utils/config");

mongoose.set("strictQuery", true);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info(`Connected to ${config.MONGODB_URI}`))
  .catch((err) => logger.error(err));

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);

module.exports = app;
