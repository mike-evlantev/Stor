import asyncHandler from "express-async-handler"; // instead of writing try/catches
import User from "../models/userModel.js";

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
      token: null,
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});
