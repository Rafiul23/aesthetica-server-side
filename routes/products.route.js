const express = require("express");
const {
  getAllBrands,
  getProductsByBrands,
  getSingleProduct,
  addToCart,
  getCartData,
  deleteCartItem,
  addProduct,
  deleteProduct,
  updateProduct,
  orderProducts,
  paymentIntentFunc,
  savePayment,
} = require("../controllers/products.controller");
const router = express.Router();

router.get("/brands", getAllBrands);
router.get("/products", getProductsByBrands);
router.get("/product/:id", getSingleProduct);
router.post("/carts", addToCart);
router.get("/carts", getCartData);
router.delete("/carts/:id", deleteCartItem);
router.post('/product', addProduct);
router.delete('/products/:id', deleteProduct);
router.put('/products/:id', updateProduct);
router.post('/orders', orderProducts);
router.post('/create-payment-intent', paymentIntentFunc);
router.post('/payments', savePayment);

module.exports = router;
