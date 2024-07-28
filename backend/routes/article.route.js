const express = require("express");
const Article = require("../models/article.model.js");
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Articles Home');
});

module.exports = router;