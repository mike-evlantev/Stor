import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler"; // instead of writing try/catches
import User from "../models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers["x-auth-token"]) {
    token = req.headers["x-auth-token"];
  }
  // Ensure token exists
  if (!token) {
    res.status(401);
    throw new Error("Not authorized to access route");
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error("Not authorized to access route");
  }
});

export const admin = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers["x-auth-token"]) {
    token = req.headers["x-auth-token"];
  }
  // Ensure token exists
  if (!token) {
    res.status(401);
    throw new Error("Not authorized to access route");
  }
  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user.isAdmin) {
      throw new Error("Not authorized to access route");
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error("Not authorized to access route");
  }
});

// Role-based authorization
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error("Not authorized to access route");
    }
    next();
  };
};
