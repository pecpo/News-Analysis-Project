const express = require("express");
const Article = require("../models/article.model.js");
const router = express.Router();
const {
    getArticles,
    getArticle,
    getArticlesByContinent,
    createArticle,
    updateArticle,
    deleteArticle
} = require("../controllers/article.controller.js");

router.get('/', getArticles);
router.get('/:id', getArticle);
router.get('/continent/:continent', getArticlesByContinent);
router.post('/', createArticle);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

module.exports = router;