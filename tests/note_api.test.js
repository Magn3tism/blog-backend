const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const Blog = require("./../models/blog");
const testHelper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = testHelper.blogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());

  await Promise.all(promiseArray);
});

test("verify the format of blogs", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("verify number of blogs", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(6);
}, 100000);

test("new blog can be added", async () => {
  const newBlog = {
    title: "title1",
    author: "author1",
    url: "url11",
    likes: 20,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const titles = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(testHelper.blogs.length + 1);

  expect(titles).toContain("title1");
}, 1000000);

afterAll(async () => {
  await mongoose.connection.close();
});

test.only("400 is sent if title or url are missing", async () => {
  const titleMissing = {
    author: "author2",
    url: "url12",
    likes: 20,
  };

  const urlMissing = {
    title: "title2",
    author: "author3",
    likes: 20,
  };

  const bothMising = {
    author: "author5",
    likes: 20,
  };

  await api.post("/api/blogs").send(titleMissing).expect(400);
  await api.post("/api/blogs").send(urlMissing).expect(400);
  await api.post("/api/blogs").send(bothMising).expect(400);
}, 100000);
