// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const productsRouter = require('./routes/products.route');
const usersRouter = require('./routes/users.route');
const app = express();
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
// Connect to the database
connectDB();

// Define routes
app.use(productsRouter);
app.use(usersRouter);


app.get('/', (req, res) => {
  res.send('Makeup is running');
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
