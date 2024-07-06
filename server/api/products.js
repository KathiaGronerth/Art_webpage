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

// Create a new product
router.post("/", async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

// Update an existing product
router.put("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      const updatedProduct = await product.update(req.body);
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    next(error);
  }
});

// Deleting an existing product
router.delete("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.send(product);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
