const express = require('express');
const { getAllBrands, getProductsByBrands, getSingleProduct, addToCart } = require('../controllers/products.controller');
const router = express.Router();

router.get('/brands', getAllBrands);
router.get('/products', getProductsByBrands);
router.get('/product/:id', getSingleProduct);
router.post('/carts', addToCart);

module.exports = router;