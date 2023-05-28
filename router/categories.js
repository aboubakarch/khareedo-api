const express = require('express');
const { v4: uuid } = require('uuid');
const { category } = require('../data');
const Category = require('../models/category');

const categoryRouter = express.Router();

categoryRouter.get('/', (req, res) => {
  setTimeout(() => {
    res.status(200).send(category);
  }, 2000);
});

categoryRouter.post('/', async (req, res) => {
  try {
    const _id = uuid();
    const resp = await Category.create({ ...req.body, _id });
    res.status(201).send(resp);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = categoryRouter;
