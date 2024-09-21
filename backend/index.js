require("dotenv").config();
const mongoose = require("mongoose");

const {
  fetchAndStoreNews,
  dropAllArticles,
} = require("./services/newsService.js");

const app = require("./app");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Successfully connected to the database!");

    //DO NOT THE ARTICLES GET!!!!!
    // await fetchAndStoreNews();

    // performSentimentAnalysis();

    //DO NOT THE ARTICLES DELET!!!!!
    // dropAllArticles();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Connection to the database failed!", err);
  });
