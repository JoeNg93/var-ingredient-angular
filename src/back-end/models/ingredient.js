const mongoose = require('mongoose');
const { pick } = require('lodash');

const IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  categoryID: String,
  categoryName: String,
});

IngredientSchema.methods.serialize = function serialize() {
  return pick(this, ['id', 'name', 'categoryID', 'categoryName']);
};

const Ingredient = mongoose.model('Ingredient', IngredientSchema);

module.exports = Ingredient;
