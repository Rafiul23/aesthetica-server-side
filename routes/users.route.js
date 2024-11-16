const express = require('express');
const { saveUser } = require('../controllers/users.controller');
const router = express.Router();

router.post('/users', saveUser);

module.exports = router;