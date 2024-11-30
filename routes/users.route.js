const express = require("express");
const {
  saveUser,
  postToken,
  removeToken,
  getAllUsers,
  deleteUser,
  makeAdmin,
  isAdmin,
} = require("../controllers/users.controller");
const { verifyToken, verifyAdmin } = require("../middlewares");
const router = express.Router();

router.post("/users", saveUser);
router.post("/jwt", postToken);
router.post("/logOut", removeToken);
router.get("/users", verifyToken, verifyAdmin, getAllUsers);
router.delete("/users/:id", verifyToken, verifyAdmin, deleteUser);
router.patch("/users/admin/:id", verifyToken, verifyAdmin, makeAdmin);
router.get('/users/admin/:email', verifyToken, isAdmin);

module.exports = router;
