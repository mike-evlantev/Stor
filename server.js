import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
import productsRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import emailRouter from "./routes/emailRoutes.js";
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
app.use("/api/email", emailRouter);

app.use(notFound);
app.use(errorHandler);

// Server static (react) assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  // when home page route is hit load index.html
  app.get("/", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  ); // look in currentDirectory/client/build/index.html
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `${process.env.NODE_ENV.toUpperCase()} server started on port ${PORT}`
      .yellow.bold
  )
);
