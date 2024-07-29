const mongoose = require('mongoose');
const express = require('express');
const articleRouter = require('./routes/article.route.js');
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/articles', articleRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the News Analysis API!');
});

mongoose.connect(
  "mongodb+srv://xegtor:4Gxa6ExNJvQVrO@backenddb.9gor8de.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB"
).then(() => {
  console.log('Successfully connected to the database!');
  app.listen(port, () => {
    console.log('Server is running on port 5000');
  });
}).catch((err) => {
  console.error('Connection to the database failed!', err);
});