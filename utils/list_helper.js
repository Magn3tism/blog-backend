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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
