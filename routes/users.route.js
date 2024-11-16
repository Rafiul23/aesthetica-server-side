const express = require('express');
const { saveUser, postJWT } = require('../controllers/users.controller');
const router = express.Router();

router.post('/users', saveUser);
router.post('/jwt', postJWT);

module.exports = router;