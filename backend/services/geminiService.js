const axios = require("axios");
require("dotenv").config();
const {
  FunctionDeclarationSchemaType,
  HarmBlockThreshold,
  HarmCategory,
  VertexAI,
} = require("@google-cloud/vertexai");

const project = "notional-impact-429718-c4";
const location = "us-central1";
const textModel = "gemini-1.5-flash-001";
const visionModel = "gemini-1.5-pro-001";

const vertexAI = new VertexAI({ project: project, location: location });

const generativeModel = vertexAI.getGenerativeModel({
  model: textModel,
  // The following parameters are optional
  // They can also be passed to individual content generation requests
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ],
  // generationConfig: {maxOutputTokens: },
});

const promptFilePath = path.join(__dirname, "../services/prompt.txt");
const prompt = fs.readFileSync(promptFilePath, "utf8");

async function performSentimentAnalysis(limit = 100) {
  try {
    const articles = await Article.find()
      .sort({ publishedAt: -1 })
      .limit(limit);

    for (const article of articles) {
      if (article.content === "No Content Available") continue;

      const articlePrompt = `${prompt}\n\nArticle Content:\n${article.content}`;
      const resp = await generativeModel.generateContent(articlePrompt);

      if (
        !resp ||
        !resp.response ||
        !resp.response.candidates ||
        !resp.response.candidates.length
      ) {
        console.error("Invalid response or no candidates available:", resp);
        continue; // Skip to the next article
      }

      // Extract the first candidate's data, assuming it contains what you need
      const candidate = resp.response.candidates[0];

      // Further parsing may be needed if the candidate data is still in JSON string format
      const analysisResults = candidate.content.parts[0].text; // Assuming candidate is the object with your data

      console.log(analysisResults);
      let jsonResponse;
      try {
        jsonResponse = JSON.parse(analysisResults);
      } catch (error) {
        console.error("Failed to parse JSON:", analysisResults);
        return; // Exit the function or handle the error as needed
      }

      const reasoning = jsonResponse.reasoning;
      const score = jsonResponse.score;

      // Update the article with the analysis results
      article.reasoning = reasoning;
      article.score = score;

      // Save the updated article back to the database
      await article.save();

      console.log(`Article "${article.title}" analyzed with score: ${score}`);
    }
  } catch (error) {
    console.error("Error performing sentiment analysis:", error);
  }
}

module.exports = {
  performSentimentAnalysis,
};
