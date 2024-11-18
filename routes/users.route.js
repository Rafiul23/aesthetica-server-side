const express = require('express');
const { saveUser, postToken, removeToken, getAllUsers, deleteUser } = require('../controllers/users.controller');
const router = express.Router();

router.post('/users', saveUser);
router.post('/jwt', postToken);
router.post('/logOut', removeToken);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

module.exports = router;