const express = require('express');
const { v4: uuid } = require('uuid');
const {
  getBestSellerByCategoryId,
  getBestSeller,
  getProductById,
  sortProductDescByRating,
} = require('../data');
const Product = require('../models/product');

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const resp = await Product.paginate(
      {},
      { offset: parseInt(page) - 1, limit: pageSize }
    );
    res.status(200).send(resp);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

productRouter.post('/', async (req, res) => {
  try {
    const data = req.body;
    const _id = uuid();
    const resp = await Product.create({ ...data, _id });
    res.status(201).send(resp);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

productRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await Product.findById(id);
    res.status(200).send(resp);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

productRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await Product.findByIdAndDelete(id);
    if (!resp) {
      res.status(404).send('Already deleted!');
      return;
    }
    res.status(200).send('Successfully Deleted');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

productRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log(data);
    const resp = await Product.findByIdAndUpdate(id, data);
    console.log(resp);
    if (!resp) {
      res.status(404).send('The product against given id not exits!');
      return;
    }
    res.status(200).send({ ...data, id });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = productRouter;
