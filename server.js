// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const productsRouter = require('./routes/products.route');
// const reviewsRouter = require('./routes/reviews.route');
const usersRouter = require('./routes/users.route');
// const paymentRouter = require('./routes/payment.route');
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Define routes
app.use(productsRouter);
app.use(usersRouter);
// app.use(reviewsRouter);
// app.use(paymentRouter);

app.get('/', (req, res) => {
  res.send('Makeup is running');
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
