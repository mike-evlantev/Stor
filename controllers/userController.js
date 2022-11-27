import asyncHandler from "express-async-handler"; // instead of writing try/catches
import { generateToken } from "../utils/generateToken.js";
import User from "../models/userModel.js";
import { sendResetPasswordEmail } from "./emailController.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

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
      id: user.id,
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
      id: user.id,
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
  try {
    // if the requesting user is an admin allow to update any user OR update self
    if (req.user.isAdmin || req.body._id == req.user._id) {     
      const user = req.body; 
      const filter = { _id: user.id };
      const updated = await User.findOneAndUpdate(filter, user, { new: true });
      if (updated) {
        res.json(updated);
      } else {
        res.status(500);
        throw new Error("Unable to update user");
      }
    } else {
      res.status(401);
      throw new Error("Unauthorized to update user");
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
});

// @route       GET api/users
// @desc        Get all users
// @access      Private (Admin)
export const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
});

// @route       GET api/users/:id
// @desc        Get user by id
// @access      Private (Admin)
export const getUserById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
});

// @route       POST api/users/create
// @desc        Create user
// @access      Private (Admin)
export const createUser = asyncHandler(async (req, res) => {
  const user = new User(req.body);
  user.password = crypto.randomBytes(20).toString('hex');
  try {
    const created = await user.save();
    // send reset password email
    sendResetPasswordEmail(created);
    res.status(201).json(created);
  } 
  catch (error) {
    console.error(error);
    throw new Error(error);
  }  
});

// @route       POST api/users/reset/:token
// @desc        Reset password
// @access      Private
export const resetPassword = asyncHandler(async (req, res) => {
  try {
    const token = req.params.token;
    const {password} = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findOne({ _id: decoded.id });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    const updated = await user.save();
    if (updated) {
      res.status(200).json({
        id: updated.id,
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
        token: generateToken(updated._id),
      });
    };
  } catch (error) {
    console.error(error);
    throw new Error(error); 
  }  
});

// @route       GET api/users/reset/:token
// @desc        Reset password
// @access      Protected (tokenized)
export const decodeToken = asyncHandler(async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json(decoded);
  } catch (error) {
    console.error(error);
    throw new Error(error);    
  }
});