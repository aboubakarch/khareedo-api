const express = require('express');
const { category } = require('../data');

const categoryRouter = express.Router();

categoryRouter.get('/', (req, res) => {
  setTimeout(() => {
    res.status(200).send(category);
  }, 2000);
});

module.exports = categoryRouter;
