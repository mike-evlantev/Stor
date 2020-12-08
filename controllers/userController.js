import asyncHandler from "express-async-handler"; // instead of writing try/catches
import { generateToken } from "../utils/generateToken.js";
import User from "../models/userModel.js";

// @route       POST /api/users
// @desc        Register user and get token
// @access      Public
export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ msg: "User already exists" });
  user = await User.create({ firstName, lastName, email, password }); // Password is encrypted as part of the User model middleware
  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid user data");
  }
});

// @route       POST /api/users/login
// @desc        Auth user and get token
// @access      Public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

// @route       GET /api/users/profile
// @desc        Get user profile
// @access      Private
export const userProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
