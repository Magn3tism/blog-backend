const express = require("express");
const cors = require("cors");

const logger = require("./utils/logger");
const config = require("./utils/config");
const blogsRouter = require("./controllers/blog");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
