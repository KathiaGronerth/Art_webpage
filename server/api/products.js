const router = require("express").Router();
const { models } = require("../db/models");
const { Product } = models;

router.get("/", async (req, res, next) => {
  try {
    const { subcategory } = req.query;
    const where = subcategory ? { subcategory } : {};
    const products = await Product.findAll({ where });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) res.json(product);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
