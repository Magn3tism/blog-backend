const { upperFirst } = require("lodash");
const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const Blog = require("./../models/blog");
const testHelper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(testHelper.blogs);
});

describe("Get Blogs", () => {
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

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(testHelper.blogs.length);
  }, 100000);

  test("a specific blog is returned", async () => {
    const response = await api.get("/api/blogs");
    const contents = response.body.map((r) => r.title);

    expect(contents).toContain("TDD harms architecture");
  }, 100000);
});

describe("Post Blogs", () => {
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

  test("400 is sent if title or url are missing", async () => {
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
});

describe("viewing a specific blog", () => {
  test("succeeds with a valid id", async () => {
    const blogToView = testHelper.blogs[0];

    const resultBlog = await api
      .get(`/api/blogs/${blogToView._id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(resultBlog.body).toEqual(blogToView);
  }, 100000);

  test("fails with statuscode 404 if blog does not exist", async () => {
    const validNonexistingId =
      testHelper.blogs[0]._id
        .toString()
        .substring(0, testHelper.blogs[0]._id.toString().length - 1) + "d";

    await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
  }, 100000);

  test("fails with statuscode 400 if id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";

    await api.get(`/api/blogs/${invalidId}`).expect(400);
  }, 100000);
});

describe("updating likes of a blog", () => {
  test("likes are updated", async () => {
    const blogToUpdate = testHelper.blogs[1];
    const updatedLikes = blogToUpdate.likes * 2;

    const response = await api
      .put(`/api/blogs/${blogToUpdate._id}`)
      .send({ ...blogToUpdate, likes: updatedLikes });

    expect(response.body.likes).toEqual(updatedLikes);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
