import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDb from "./config/db.js";
import products from'./data/products.js';
dotenv.config();

const app = express();

// TODO: Routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  res.json(product);
});

// Database
connectDb();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`${process.env.NODE_ENV.toUpperCase()} server started on port ${PORT}`.yellow.bold));