const express = require('express');
const { getAllBrands, getProductsByBrands } = require('../controllers/products.controller');
const router = express.Router();

router.get('/brands', getAllBrands);
router.get('/products', getProductsByBrands);

module.exports = router;