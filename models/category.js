const { Schema, Types, model } = require('mongoose');

const categorySchema = new Schema({
  _id: Schema.Types.String,
  title: Schema.Types.String,
});

const Category = model('Category', categorySchema);

module.exports = Category;
