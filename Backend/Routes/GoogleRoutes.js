import express from 'express';
import User from '../Models/UserModel.js';
import asyncHandler from 'express-async-handler';
import { protect } from '../Middleware/AuthMiddleware.js';
import generateToken from '../utils/generateToken.js';

const googleRouter = express.Router();

// Route để xử lý đăng nhập Google
googleRouter.post('/', asyncHandler(async (req, res) => {
  const { email, name } = req.body;

  try {
    console.log(email);
    const user = await User.findOne({ email });
  
    return res.status(201).json({
      
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      createdAt: user.createdAt,
  });
  } catch (error) {
    console.error('Error saving user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
}));

// Route để lấy thông tin người dùng
googleRouter.get('/profile', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
}));

// Route để cập nhật thông tin người dùng
googleRouter.put('/profile', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      createdAt: updatedUser.createdAt,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
}));

export default googleRouter;
