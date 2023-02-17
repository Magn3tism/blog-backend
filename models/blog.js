const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 5,
    required: true,
  },
  author: String,
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

if (process.env.NODE_ENV !== "test") {
  blogSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });
}

module.exports = mongoose.model("Blog", blogSchema);
