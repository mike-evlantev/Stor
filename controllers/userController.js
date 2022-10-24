import asyncHandler from "express-async-handler"; // instead of writing try/catches
import { generateToken } from "../utils/generateToken.js";
import User from "../models/userModel.js";

// @route       POST /api/users
// @desc        Register user and get token
// @access      Public
export const registerUser = asyncHandler(async (req, res) => {
  const { first, last, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ msg: "User already exists" });
  user = await User.create({ first, last, email, password }); // Password is encrypted as part of the User model middleware
  if (user) {
    res.json({
      _id: user._id,
      first: user.first,
      middle: user.middle,
      last: user.last,
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
      first: user.first,
      middle: user.middle,
      last: user.last,
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

// @route       PUT /api/users/update
// @desc        Update user
// @access      Private
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.user._id);
  if (user) {
    if (req.body._id == req.user._id) {
      const {
        first,
        middle,
        last,
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

      user.first = first;
      user.middle = middle;
      user.last = last;
      user.address1 = address1;
      user.address2 = address2;
      user.city = city;
      user.state = state;
      user.zip = zip;
      user.phone = phone;
      // if (password) user.password = password || user.password;

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        first: updatedUser.first,
        middle: updatedUser.middle,
        last: updatedUser.last,
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
      res.status(403);
      throw new Error("Unable to modify user");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
