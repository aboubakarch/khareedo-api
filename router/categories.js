const express = require('express');
const { v4: uuid } = require('uuid');
const status = require('http-status');
const Category = require('../models/category');

const categoryRouter = express.Router();

categoryRouter.get('/', async (req, res) => {
  try {
    const resp = await Category.find();
    res.status(status.OK).send(resp);
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send(error.message);
  }
});

categoryRouter.post('/', async (req, res) => {
  try {
    const _id = uuid();
    const resp = await Category.create({ ...req.body, _id });
    res.status(status.CREATED).send(resp);
  } catch (error) {
    res.status(status.NOT_FOUND).send(error.message);
  }
});

categoryRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await Category.findByIdAndDelete(id);
    if (!resp) {
      res.status(status.NOT_FOUND).send('Already deleted');
      return;
    }
    res.status(status.OK).send('successfully deleted');
  } catch (error) {
    res.status(status.NOT_FOUND).send(error.message);
  }
});

categoryRouter.put('/:id', async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const resp = await Category.findByIdAndUpdate(id, data);
    if (!resp) {
      res.status(status.NOT_FOUND).send('Category not found against given id.');
      return;
    }
    res.status(status.OK).send({ ...data, id });
  } catch (error) {
    res.status(status.NOT_FOUND).send(error.message);
  }
});

module.exports = categoryRouter;
