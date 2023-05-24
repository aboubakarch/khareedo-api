const express = require('express');
const {
  getBestSellerByCategoryId,
  getBestSeller,
  getProductById,
  sortProductDescByRating,
} = require('../data');

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
  setTimeout(() => {
    res.status(200).send(product);
  }, 3000);
});

module.exports = productRouter;
