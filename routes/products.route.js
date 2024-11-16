const express = require("express");
const {
  getAllBrands,
  getProductsByBrands,
  getSingleProduct,
  addToCart,
  getCartData,
  deleteCart,
} = require("../controllers/products.controller");
const router = express.Router();

router.get("/brands", getAllBrands);
router.get("/products", getProductsByBrands);
router.get("/product/:id", getSingleProduct);
router.post("/carts", addToCart);
router.get("/carts", getCartData);
router.delete("/carts/:id", deleteCart);

module.exports = router;
