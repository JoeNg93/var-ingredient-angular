const express = require('express');

const router = express.Router();

const Category = require('../../models/category');

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.json(categories.map(category => category.serialize()));
  } catch (err) {
    console.log(`Error in /api/categories: ${err.message}`);
    return res.status(500).send();
  }
});

module.exports = router;
