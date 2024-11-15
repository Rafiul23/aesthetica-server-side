const express = require('express');
const { getAllBrands } = require('../controllers/products.controller');
const router = express.Router();

router.get('/brands', getAllBrands);

module.exports = router;