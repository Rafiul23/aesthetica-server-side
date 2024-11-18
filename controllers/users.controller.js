const { ObjectId } = require("mongodb");
const connectDB = require("../config/db");
const jwt = require("jsonwebtoken");

const saveUser = async (req, res) => {
  try {
    const db = await connectDB();
    const user = req.body;
    const query = { email: user.email };
    const isExist = await db.collection("users").findOne(query);
    if (isExist) {
      return res.send({ message: "user already exists!" });
    }
    const result = await db.collection("users").insertOne(user);
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to save new user" });
  }
};

const postToken = async (req, res) => {
  try {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "6h",
    });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
      })
      .send({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to post token" });
  }
};

const removeToken = async (req, res) => {
  try {
    const user = req.body;
    console.log("current user:", user);
    res.clearCookie("token", { maxAge: 0 }).send({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove token" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const db = await connectDB();
    const result = await db.collection("users").find().toArray();
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const db = await connectDB();
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await db.collection("users").deleteOne(query);
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete users" });
  }
};

const makeAdmin = async (req, res) => {
  try {
    const db = await connectDB();
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const updatedRole = {
      $set: {
        role: "admin",
      },
    };
    const result = await db.collection("users").updateOne(filter, updatedRole);
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to make user an admin" });
  }
};

module.exports = {
  saveUser,
  postToken,
  removeToken,
  getAllUsers,
  deleteUser,
  makeAdmin,
};
