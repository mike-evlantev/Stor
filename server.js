import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import {notFound, errorHandler} from './middleware/errorHandler.js';
//import authRouter from'./routes/auth.js';
import productsRouter from'./routes/products.js';
dotenv.config();

const app = express();

// Database
connectDb();

// Routes
//app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);

// Init middleware
app.use(express.json({ extended: false })); // Allows to accept data within a body of a request (req.body)
app.use(notFound);
app.use(errorHandler); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`${process.env.NODE_ENV.toUpperCase()} server started on port ${PORT}`.yellow.bold));