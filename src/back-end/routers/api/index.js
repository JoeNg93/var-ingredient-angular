const express = require('express');

const categoryRouter = require('./category');
const ingredientRouter = require('./ingredient');
const recipeRouter = require('./recipe');

const router = express.Router();

router.use('/categories', categoryRouter);
router.use('/ingredients', ingredientRouter);
router.use('/recipes', recipeRouter);

module.exports = router;
