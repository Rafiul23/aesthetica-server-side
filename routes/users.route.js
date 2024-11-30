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
const router = express.Router();

router.post("/users", saveUser);
router.post("/jwt", postToken);
router.post("/logOut", removeToken);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.patch("/users/admin/:id", makeAdmin);
router.get('/users/admin/:email', isAdmin);

module.exports = router;
