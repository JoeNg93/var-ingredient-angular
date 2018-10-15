const express = require('express');

const categoryRouter = require('./category');
const ingredientRouter = require('./ingredient');

const router = express.Router();

router.use('/categories', categoryRouter);
router.use('/ingredients', ingredientRouter);

module.exports = router;
