const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("./../models/users");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const correctPassowrd =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && correctPassowrd))
    return response.status(401).json({ error: "invald username or passowrd" });

  const userForToken = {
    user: user.user,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
