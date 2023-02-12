const mongoose = require("mongoose");
const logger = require("./../utils/logger");
const config = require("./../utils/config");

mongoose.set("strictQuery", true);

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 5,
    required: true,
  },
  author: {
    type: String,
    minLength: 5,
    required: true,
  },
  url: {
    type: String,
    minLength: 5,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info(`Connected to ${config.MONGODB_URI}`))
  .catch((err) => logger.error(err));

module.exports = mongoose.model("Blog", blogSchema);
