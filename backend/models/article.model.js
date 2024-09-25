const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: Date,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  urlToImage: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  leaning: {
    type: Number,
    required: false,
  },
  reasoning: {
    type: String,
    required: false,
  },
});

articleSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
