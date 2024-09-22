const axios = require("axios");
const Article = require("../models/article.model.js");

const baseUrl = "https://api.newscatcherapi.com/v2/latest_headlines";
const contentBaseUrl = "https://api.diffbot.com/v3/article";
const apiKey = process.env.NEWS_API_KEY;
const contentApiKey = process.env.CONTENT_API_KEY;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

function fetchArticleContent(url) {
  return axios
    .get(contentBaseUrl, {
      params: {
        token: contentApiKey,
        url: url,
      },
    })
    .then((response) => {
      console.log("Fetched article content", response.data.objects[0].text);
      return response.data.objects[0].text; // Return only the text from response.data
    })
    .catch((error) => {
      console.error("Error fetching article content:", error);
      return "NUH"; // Return fallback text in case of an error
    });
}

function assignAllArticleContent() {
  return Article.find({})
    .then((articles) => {
      return articles.reduce((promiseChain, article) => {
        return promiseChain
          .then(() => fetchArticleContent(article.url))
          .then((content) => {
            if (content && content !== "NUH") {
              article.content = content;
              return article.save().then(() => {
                console.log(`Saved content for article: ${article.title}`);
              });
            }
          })
          .then(() => delay(14000)); // 14 seconds delay to stay within rate limit
      }, Promise.resolve()); // Initial empty resolved promise to start the chain
    })
    .catch((error) => {
      console.error("Error assigning article content:", error);
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

module.exports = {
  fetchAndStoreNews,
  dropAllArticles,
  fetchArticleContent,
  assignAllArticleContent,
};
