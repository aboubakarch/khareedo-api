const express = require('express');
const { v4: uuid } = require('uuid');
const { category } = require('../data');
const Category = require('../models/category');

const categoryRouter = express.Router();

categoryRouter.get('/', async (req, res) => {
  try {
    const resp = await Category.find();
    res.status(200).send(resp);
  } catch (error) {
    res.status(500).send(error.message);
  }
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

categoryRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await Category.findByIdAndDelete(id);
    if (!resp) {
      res.status(400).send('Already deleted');
      return;
    }
    res.status(200).send('successfully deleted');
  } catch (error) {
    res.status(404).send(error.message);
  }
});

categoryRouter.put('/:id', async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const resp = await Category.findByIdAndUpdate(id, data);
    if (!resp) {
      res.status(404).send('Category not found against given id.');
      return;
    }
    res.status(200).send({ ...data, id });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = categoryRouter;
