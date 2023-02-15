const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((likes, blog) => likes + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return "empty list";
  if (blogs.length === 1) return blogs[0];

  let fav = blogs[0];

  blogs.forEach((blog) => {
    if (blog.likes > fav.likes) fav = blog;
  });

  return fav;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};

  let mostBlogs = _.maxBy(_.toPairs(_.countBy(blogs, "author")), _.last);
  return { author: mostBlogs[0], blogs: mostBlogs[1] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
