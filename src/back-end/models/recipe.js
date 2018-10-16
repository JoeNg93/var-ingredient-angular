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

const Recipe = mongoose.model('Recipe', RecipeSchema);

RecipeSchema.statics.findByIngredients = function findByIngredients(
  ingredients
) {
  return Recipe.find({
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

module.exports = Recipe;
