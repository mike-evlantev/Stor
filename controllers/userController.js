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
      address1: user.address1,
      address2: user.address2,
      city: user.city,
      state: user.state,
      zip: user.zip,
      phone: user.phone,
      email: user.email,
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
      address1: user.address1,
      address2: user.address2,
      city: user.city,
      state: user.state,
      zip: user.zip,
      phone: user.phone,
      email: user.email,
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
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      address1: user.address1,
      address2: user.address2,
      city: user.city,
      state: user.state,
      zip: user.zip,
      phone: user.phone,
      email: user.email,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @route       PUT /api/users/profile
// @desc        Update user profile
// @access      Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.user._id);
  if (user && req.body._id === req.user._id) {
    const {
      firstName,
      middleName,
      lastName,
      address1,
      address2,
      city,
      state,
      zip,
      phone,
      // email, <-- cannot be updated. for now...
      password,
    } = req.body;

    // TODO: validate fields

    user.firstName = firstName || user.firstName;
    user.middleName = middleName || user.middleName;
    user.lastName = lastName || user.lastName;
    user.address1 = address1 || user.address1;
    user.address2 = address2 || user.address2;
    user.city = city || user.city;
    user.state = state || user.state;
    user.zip = zip || user.zip;
    user.phone = phone || user.phone;
    // if (password) user.password = password || user.password;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      middleName: updatedUser.middleName,
      lastName: updatedUser.lastName,
      address1: updatedUser.address1,
      address2: updatedUser.address2,
      city: updatedUser.city,
      state: updatedUser.state,
      zip: updatedUser.zip,
      phone: updatedUser.phone,
      email: updatedUser.email,
      isActive: updatedUser.isActive,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
