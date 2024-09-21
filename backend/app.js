const express = require("express");
const morgan = require("morgan");

const articleRouter = require("./routes/article.route.js");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use("/api/articles", articleRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the News Analysis API!");
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);

module.exports = app;
