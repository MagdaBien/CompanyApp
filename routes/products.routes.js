const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/products.controller");

router.get("/products", ProductController.getAll);
router.get("/products/random", ProductController.getRandom);
router.get("/products/:id", ProductController.getById);
router.post("/products", ProductController.addOne);
router.put("/products/:id", ProductController.updateOne);
router.delete("/products/:id", ProductController.deleteOne);

module.exports = router;
