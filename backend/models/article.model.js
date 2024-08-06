const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema(
  {
    author: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    urlToImage: {
      type: String,
      required: true
    },
    publishedAt: {
      type: Date,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    continent: {
      type: String,
      required: true
    },
    politicalLeaning: {
      type: Number,
      required: false
    },
    sentimentAnalysis: {
      type: String,
      required: false
    }
  }
);

const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;