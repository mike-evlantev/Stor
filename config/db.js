import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.blue.bold);
  } catch (error) {
    console.error(error.message.red.underline.bold);
    process.exit(1);
  }
};

export default connectDb;