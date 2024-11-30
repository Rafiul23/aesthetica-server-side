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
  confirmDelivery,
  addReview,
  getAllReviews,
  getStatsInfo,
  getUsersSats,
} = require("../controllers/products.controller");
const { verifyToken, verifyAdmin } = require("../middlewares");
const router = express.Router();

router.get("/brands", getAllBrands);
router.get("/products", getProductsByBrands);
router.get("/product/:id", getSingleProduct);
router.post("/carts", verifyToken, addToCart);
router.get("/carts", verifyToken, getCartData);
router.delete("/carts/:id", verifyToken, deleteCartItem);
router.post('/product', verifyToken, verifyAdmin, addProduct);
router.delete('/products/:id', verifyToken, verifyAdmin, deleteProduct);
router.put('/products/:id', verifyToken, verifyAdmin, updateProduct);
router.post('/create-payment-intent', verifyToken, paymentIntentFunc);
router.post('/payments', verifyToken, savePayment);
router.get('/payments', verifyToken, getPaymentsInfo );
router.get('/orders', verifyToken, getOrderedProducts);
router.get('/allOrders', verifyToken, verifyAdmin, getAllOrders);
router.patch('/orders/:id', verifyToken, verifyAdmin, confirmDelivery);
router.post('/reviews', verifyToken, addReview);
router.get('/reviews', getAllReviews);
router.get('/adminStats', verifyToken, verifyAdmin, getStatsInfo);
router.get('/userStats', verifyToken, getUsersSats);
module.exports = router;
