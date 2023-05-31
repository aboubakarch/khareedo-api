const { Schema, Types, model } = require('mongoose');
const paginate = require('mongoose-paginate-v2');

const productSchema = new Schema({
  _id: Schema.Types.String,
  title: Schema.Types.String,
  img: Schema.Types.String,
  price: Schema.Types.String,
  category: {
    type: Schema.Types.String,
    ref: 'Category',
  },
  rating: Schema.Types.Number,
  description: Schema.Types.String,
});

productSchema.plugin(paginate);

const Product = model('Product', productSchema);

module.exports = Product;
