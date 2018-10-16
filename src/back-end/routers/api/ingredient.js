const express = require('express');

const logger = require('../../utils/logger');

const router = express.Router();

const Ingredient = require('../../models/ingredient');

router.get('/', async (req, res) => {
  try {
    const ingredients = await Ingredient.find({});
    return res.json(ingredients.map(ingredient => ingredient.serialize()));
  } catch (err) {
    logger.log('error', `Error in /api/ingredients: ${err.message}`);
    return res.status(500).send();
  }
});

module.exports = router;
