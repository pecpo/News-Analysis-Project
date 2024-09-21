const axios = require("axios");
const Article = require("../models/article.model.js");

const baseUrl = "https://api.newscatcherapi.com/v2/latest_headlines";
const apiKey = process.env.NEWS_API_KEY;

function fetchAndStoreNews() {
  axios
    .get(baseUrl, {
      params: {
        page_size: 100,
        lang: "en",
        topic: "politics",
      },
      headers: {
        "x-api-key": apiKey,
      },
    })
    .then((response) => {
      const articles = response.data.articles;

      // Filter articles that have no content
      const articlesWithContent = articles;

      // Save articles to the database using Promises
      const savePromises = articlesWithContent.map((articleData) => {
        const article = new Article({
          author: articleData.authors || "Unknown",
          title: articleData.title || "No Title Available",
          description: articleData.excerpt || "No Description Available",
          url: articleData.link || "No URL Available",
          urlToImage: articleData.media || "https://via.placeholder.com/150",
          publishedAt: articleData.published_date || new Date(),
          country: articleData.country || "Unknown",
        });

        // Log data before saving to see if it is correct
        console.log("Saving article:", article);

        // Return the promise for saving
        return article.save().catch((err) => {
          console.error("Error saving article:", err);
        });
      });

      // Wait for all articles to be saved using Promise.all
      //NOT THE BEST WAY TO DO THIS (probably), change later!!
      return Promise.all(savePromises);
    })
    .then(() => {
      console.log("All articles have been stored successfully.");
    })
    .catch((error) => {
      console.error("Error fetching or storing news articles:", error);
    });
}

function dropAllArticles() {
  Article.deleteMany({})
    .then(() => {
      console.log("All articles have been deleted successfully.");
    })
    .catch((error) => {
      console.error("Error deleting articles:", error);
    });
}

module.exports = { fetchAndStoreNews, dropAllArticles };
