import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import productsRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
dotenv.config();

const app = express();

// Database
connectDb();

// Preserve order of app.use() statements below
// Init middleware
app.use(express.json({ extended: false })); // Allows to accept data within a body of a request (req.body)

// Routes
app.use("/api/products", productsRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/payment", paymentRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `${process.env.NODE_ENV.toUpperCase()} server started on port ${PORT}`
      .yellow.bold
  )
);
