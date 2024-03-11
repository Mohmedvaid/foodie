// src/api/controllers/user.controller.js

import mongoose from 'mongoose';
import User from '../models/user';
import CustomError from '../../utils/CustomError';

const getUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const isValidId = mongoose.Types.ObjectId.isValid(userId);
    if (!isValidId) throw new CustomError('Invalid user ID');
    const user = await User.findById(userId);

    if (!user) throw new Error('User not found');

    return res.standardResponse(200, true, user, 'User profile retrieved successfully');
  } catch (error) {
    return next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const updateData = req.body;

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!user) throw new Error('User not found');

    return res.standardResponse(200, true, user, 'User profile updated successfully');
  } catch (error) {
    return next(error);
  }
};

export { getUserProfile, updateUserProfile };
