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

productRouter.get('/', (req, res) => {
  const { cid, count } = req.query;
  const products = count
    ? sortProductDescByRating(count)
    : cid
    ? getBestSellerByCategoryId(cid)
    : getBestSeller();
  setTimeout(() => {
    res.status(200).send(products);
  }, 3000);
});

productRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = getProductById(id);
  if (product.id) {
    setTimeout(() => {
      res.status(200).send(product);
    }, 3000);
  } else {
    res.status(404).send('Product not found');
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

module.exports = productRouter;
