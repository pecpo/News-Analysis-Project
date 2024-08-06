const mongoose = require("mongoose");
require("dotenv").config();
const axios = require("axios");
const Article = require("./models/article.model.js");
const express = require("express");
const articleRouter = require("./routes/article.route.js");
const app = express();
const port = 5000;
// const {
//   FunctionDeclarationSchemaType,
//   HarmBlockThreshold,
//   HarmCategory,
//   VertexAI
// } = require('@google-cloud/vertexai');
// const fs = require('fs');
// const path = require('path');


// const project = 'notional-impact-429718-c4';
// const location = 'us-central1';
// const textModel =  'gemini-1.5-flash-001';
// const visionModel = 'gemini-1.5-pro-001';

// const vertexAI = new VertexAI({project: project, location: location});
// const generativeModel = vertexAI.getGenerativeModel({
//   model: textModel,
//   // The following parameters are optional
//   // They can also be passed to individual content generation requests
//   safetySettings: [
//     {category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH},
//     {category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH},
//     {category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH},
//     {category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH},
//   ]
//   // generationConfig: {maxOutputTokens: },
// });

// // Read the prompt from a text file
// const promptFilePath = '/prompt.txt';
// const prompt = fs.readFileSync(promptFilePath, 'utf8');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/articles", articleRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the News Analysis API!");
});

// Function to fetch and store news articles
async function fetchAndStoreNews() {
  // Mapping of continents to their respective country codes
  const continentCountries = {
    Africa: ["za", "ng", "eg", "ke"], // Add more country codes as needed
    Asia: ["cn", "jp", "in", "kr"],
    Europe: ["gb", "fr", "de", "it"],
    "North America": ["us", "ca", "mx"],
    "South America": ["br", "ar", "cl", "co"],
    Oceania: ["au", "nz"],
  };

  const apiKey = process.env.NEWS_API_KEY; // Use environment variable

  try {
    for (const [continent, countries] of Object.entries(continentCountries)) {
      for (const country of countries) {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines",
          {
            params: {
              category: "politics", // Category for political news
              apiKey: apiKey,
              country: country,
            },
          },
        );

        const articles = response.data.articles;

        // Loop through each article and save it to the database
        for (const articleData of articles) {
          const article = new Article({
            author: articleData.author || "Unknown",
            title: articleData.title || "No Title Available",
            description: articleData.description || "No Description Available",
            url: articleData.url || "No URL Available",
            urlToImage:
              articleData.urlToImage || "https://via.placeholder.com/150",
            publishedAt: articleData.publishedAt || new Date(),
            content: articleData.content || "No Content Available",
            continent: continent,
          });

          await article.save();
        }

        console.log(`Stored news articles for ${country} in ${continent}.`);
      }
    }

    //sentiment analysis here
    


  } catch (error) {
    console.error("Error fetching news articles:", error);
  }
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("Successfully connected to the database!");
    // await fetchAndStoreNews();
    app.listen(port, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.error("Connection to the database failed!", err);
  });
