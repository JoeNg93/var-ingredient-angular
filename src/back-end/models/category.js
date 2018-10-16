const mongoose = require('mongoose');
const { pick } = require('lodash');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

CategorySchema.methods.serialize = function serialize() {
  return pick(this, ['id', 'name']);
};

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
