const listHelper = require("../utils/list_helper");
const testHelper = require("./test_helper");

// ---------------------------------------------------------------------------------------------------------------------------
test("dummy returns one", () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);

  expect(result).toBe(1);
});

// ---------------------------------------------------------------------------------------------------------------------------

describe("total likes", () => {
  test("when list has only one blog", () => {
    expect(listHelper.totalLikes(testHelper.listWithOneBlog)).toBe(5);
  });

  test("list has multiple blogs", () => {
    expect(listHelper.totalLikes(testHelper.blogs)).toBe(36);
  });

  test("empty list", () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });
});

// ---------------------------------------------------------------------------------------------------------------------------
describe("blog with most likes", () => {
  test("when list has no blogs", () => {
    expect(listHelper.favoriteBlog([])).toBe("empty list");
  });

  test("when list has one blog", () => {
    expect(listHelper.favoriteBlog(testHelper.listWithOneBlog)).toEqual(
      testHelper.listWithOneBlog[0]
    );
  });

  test("when list has multiple blogs", () => {
    expect(listHelper.favoriteBlog(testHelper.blogs)).toEqual({
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    });
  });
});

// ---------------------------------------------------------------------------------------------------------------------------
describe("most blogs by an author", () => {
  test("when list has no blogs", () => {
    expect(listHelper.mostBlogs([])).toEqual({});
  });

  test("when list has one blog", () => {
    expect(listHelper.mostBlogs(testHelper.listWithOneBlog)).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });

  test("when list has multiple blogs", () => {
    expect(listHelper.mostBlogs(testHelper.listWithTwoBlogs)).toEqual({
      author: "Michael Chan",
      blogs: 1,
    });

    expect(listHelper.mostBlogs(testHelper.listWithThreeBlogs)).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 2,
    });

    expect(listHelper.mostBlogs(testHelper.blogs)).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});
