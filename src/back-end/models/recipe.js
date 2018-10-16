const mongoose = require('mongoose');
const { pick } = require('lodash');

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  image: {
    _id: String,
    versionId: String,
    imageType: String,
  },
  ingredients: [
    {
      _id: String,
      quantity: String,
      name: String,
    },
  ],
  cookingTime: Number,
  numOfMeals: Number,
  instructions: [String],
  numOfLikes: {
    type: Number,
    default: 0,
  },
  numOfDislikes: {
    type: Number,
    default: 0,
  },
});

RecipeSchema.statics.findByIngredients = function findByIngredients(
  ingredients
) {
  return this.find({
    ingredients: {
      $elemMatch: {
        name: { $in: ingredients },
      },
    },
  });
};

RecipeSchema.methods.serialize = function serialize() {
  return pick(this, [
    'name',
    'description',
    'image',
    'ingredients',
    'cookingTime',
    'numOfMeals',
    'instructions',
    'numOfLikes',
    'numOfDislikes',
  ]);
};

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;
