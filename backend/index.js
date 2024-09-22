require("dotenv").config();
const mongoose = require("mongoose");

const {
  fetchAndStoreNews,
  dropAllArticles,
  assignAllArticleContent,
  fetchArticleContent,
} = require("./services/newsService.js");

const app = require("./app");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Successfully connected to the database!");

    // console.log(
    //   fetchArticleContent(
    //     "https://www.mainlinemedianews.com/2024/09/21/presidential-politics-come-to-berks-county-with-a-visit-from-jd-vance/"
    //   )
    // );

    // fetchArticleContent(
    //   "https://www.mainlinemedianews.com/2024/09/21/presidential-politics-come-to-berks-county-with-a-visit-from-jd-vance/"
    // ).then((article) => {
    //   console.log(article);
    // });

    assignAllArticleContent();

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
