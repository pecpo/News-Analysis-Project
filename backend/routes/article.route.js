const express = require("express");
const router = express.Router();
const {
  getArticles,
  getArticle,
  getArticlesByCountry,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/article.controller.js");

router.get("/", getArticles);
router.get("/:id", getArticle);
router.get("/country/:code", getArticlesByCountry);
router.post("/", createArticle);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);

module.exports = router;
