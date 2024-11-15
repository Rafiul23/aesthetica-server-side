// config/db.js
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wlof2pa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db = null;

async function connectDB() {

  if(db){
    return db;
  }

  try {
    await client.connect();
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    return db = client.db("productsDB"); 
  } catch (err) {
    console.error("MongoDB connection failed", err);
    process.exit(1); // Exit if the connection fails
  }
}

module.exports = connectDB;
