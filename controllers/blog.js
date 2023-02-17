const blogsRouter = require("express").Router();
const Blog = require("./../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});

  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const savedBlog = await blog.save();

  response.status(200).json(savedBlog);
});

blogsRouter.get("/:id", (request, response, next) => {
  const id = request.params.id;

  Blog.findById(id)
    .then((blog) => {
      if (blog) response.json(blog);
      else response.status(404).end();
    })
    .catch((err) => next(err));
});

module.exports = blogsRouter;
