const express = require('express');

const router = express.Router();

const Recipe = require('../../models/recipe');

router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    return res.json(recipes.map(recipe => recipe.serialize()));
  } catch (err) {
    console.log(`Error in /api/recipes: ${err.message}`);
    return res.status(500).send();
  }
});

module.exports = router;
