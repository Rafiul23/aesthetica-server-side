const connectDB = require("../config/db");
const jwt = require('jsonwebtoken');

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

const postJWT = async(req, res)=>{
    try {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '6h'
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: false
      }).send({success: true})

    } catch (error) {
        res.status(500).json({ message: "Failed to post jwt" }); 
    }
}
module.exports = {
  saveUser,
  postJWT
};
