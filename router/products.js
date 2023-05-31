const express = require('express');
const { v4: uuid } = require('uuid');
const status = require('http-status');
const Product = require('../models/product');

const SORT = {
  asc: 1,
  desc: -1,
};

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  try {
    const { page, pageSize, cid, sortBy = 'price', sort = 'asc' } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(pageSize);
    const query = cid ? { category: cid } : {};
    const resp = await Product.paginate(
      { ...query },
      {
        populate: 'category',
        offset,
        limit: pageSize,
        sort: { [sortBy]: SORT[sort] },
      }
    );
    res.status(status.OK).send(resp);
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send(error.message);
  }
});

productRouter.post('/', async (req, res) => {
  try {
    const data = req.body;
    const _id = uuid();
    const resp = await Product.create({ ...data, _id });
    res.status(status.CREATED).send(resp);
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send(error.message);
  }
});

productRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await Product.findById(id).populate('category');
    res.status(status.OK).send(resp);
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send(error.message);
  }
});

productRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await Product.findByIdAndDelete(id);
    if (!resp) {
      res.status(status.NOT_FOUND).send('Already deleted!');
      return;
    }
    res.status(status.OK).send('Successfully Deleted');
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send(error.message);
  }
});

productRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const resp = await Product.findByIdAndUpdate(id, data);
    console.log(resp);
    if (!resp) {
      res
        .status(status.NOT_FOUND)
        .send('The product against given id not exits!');
      return;
    }
    res.status(status.OK).send({ ...data, id });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send(error.message);
  }
});

module.exports = productRouter;

// pageSize=10
//page1: 0  10*0=0
//page2: 10 10*1=10
// page3:20 10*2=20

// pageSize*(page-1)

// category:
// asc | desc
