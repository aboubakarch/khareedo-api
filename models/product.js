const { Schema, Types, model } = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const productSchema = new Schema({
  _id: Schema.Types.String,
  title: Schema.Types.String,
  img: Schema.Types.String,
  price: Schema.Types.String,
  category: Schema.Types.String,
  rating: Schema.Types.Number,
  description: Schema.Types.String,
});

productSchema.plugin(paginate);

const Product = model('Product', productSchema);

module.exports = Product;
