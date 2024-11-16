const express = require('express');
const { saveUser, postToken, removeToken } = require('../controllers/users.controller');
const router = express.Router();

router.post('/users', saveUser);
router.post('/jwt', postToken);
router.post('/logOut', removeToken);

module.exports = router;