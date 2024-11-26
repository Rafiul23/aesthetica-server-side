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
  paymentIntentFunc,
  savePayment,
  getPaymentsInfo,
  getOrderedProducts,
  getAllOrders,
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
router.post('/create-payment-intent', paymentIntentFunc);
router.post('/payments', savePayment);
router.get('/payments', getPaymentsInfo );
router.get('/orders', getOrderedProducts);
router.get('/allOrders', getAllOrders);


module.exports = router;
