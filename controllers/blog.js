const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");

const Blog = require("./../models/blog");
const User = require("../models/users");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id)
    return response.status(401).json({ error: "invalid token" });

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({ ...request.body, user: user.id });
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(200).json(savedBlog);
});

blogsRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const foundBlog = await Blog.findById(id);

  if (foundBlog) response.json(foundBlog);
  else response.status(404).end();
});
1;

blogsRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id)
    return response.status(401).json({ error: "invalid token" });

  await Blog.findByIdAndRemove(request.params.id);

  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id)
    return response.status(401).json({ error: "invalid token" });

  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });

  response.json(updatedBlog);
});

module.exports = blogsRouter;
