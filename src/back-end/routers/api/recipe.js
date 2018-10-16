const express = require('express');

const router = express.Router();

const Recipe = require('../../models/recipe');
const logger = require('../../utils/logger');

router.get('/', async (req, res) => {
  const { ingredients } = req.query;

  try {
    let recipes = [];
    if (ingredients && ingredients.trim()) {
      recipes = await Recipe.findByIngredients(ingredients.split(/\s*,\s*/));
    } else {
      recipes = await Recipe.find({});
    }
    return res.json(recipes.map(recipe => recipe.serialize()));
  } catch (err) {
    logger.log('error', `Error in /api/recipes: ${err.message}`);
    return res.status(500).send();
  }
});

module.exports = router;
