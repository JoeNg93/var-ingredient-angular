const express = require('express');
const { ObjectID } = require('mongodb');

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

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(400).json({ error: 'id is invalid.' });
  }

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).send();
    }
    return res.json(recipe.serialize());
  } catch (err) {
    logger.log('error', `Error in /api/recipes: ${err.message}`);
    return res.status(500).send();
  }
});

module.exports = router;
