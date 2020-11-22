import mongoose from 'mongoose';
import colors from 'colors';
import connectDB from '../config/db.js';
import products from './products.js';
import users from './users.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';
import dotenv from 'dotenv';
dotenv.config();
connectDB();

const createResource = async (model, data) => {
  const results = await model.create(data);
  console.log(`Imported ${results.length} ${model.modelName}s`.green.inverse);
  return results;
};

const deleteResource = async model => {
  const results = await model.deleteMany();
  console.log(`Deleted ${results.deletedCount} ${model.modelName}s`.red.inverse);
};

const importDataAsync = async () => {
  try {
    await deleteDataAsync();
    console.log("Importing data...");
    const createdUsers = await createResource(User, users);
    const adminUserId = createdUsers.find(u => u.isAdmin === true)._id;
    const productsWithUsers = products.map(product => {
      return {...product, user: adminUserId};
    });
    await createResource(Product, productsWithUsers);
    
    process.exit();
  } catch (error) {
    console.error(`Process terminated. ${error}`.red.inverse);
    process.exit(1);
  }
};

const deleteDataAsync = async () => {
  try {
    console.log("Deleting data...");
    await deleteResource(Order);
    await deleteResource(Product);
    await deleteResource(User);
  } catch (error) {
    console.error(`Process terminated. ${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-i") {
  importDataAsync();
} else if (process.argv[2] === "-d") {
  deleteDataAsync();
  process.exit();
} else {
  console.log("Unrecognized command. Process terminated.");
  process.exit(1);
}
