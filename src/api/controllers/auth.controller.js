// src/api/controllers/auth.controller.js
import Eater from '../models/eater.model';
import Cooker from '../models/cooker.model';
import CustomError from '../../utils/CustomError';
import jwt from 'jsonwebtoken';
import { REFRESH_TOKEN_SECRET } from '../../config/app.config';

const registerEater = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const existingUser = await Eater.findOne({ email });
    if (existingUser) throw new CustomError('User already exists', 409);

    const user = new Eater({ email, password, firstName, lastName });
    await user.save();

    return res.standardResponse(201, true, { userId: user._id }, 'User successfully registered');
  } catch (error) {
    return next(error);
  }
};

const registerCooker = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const existingUser = await Cooker.findOne({ email });

    if (existingUser) throw new CustomError('Cooker already exists', 409);

    const user = new Cooker({ email, password, firstName, lastName, role: 'cooker' });
    await user.save();

    return res.standardResponse(
      201,
      true,
      { userId: user._id },
      'User successfully registered as a cooker'
    );
  } catch (error) {
    return next(error);
  }
};

const loginEater = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Eater.findOne({ email });

    if (!user || !(await user.comparePassword(password)))
      throw new CustomError('Invalid email or password', 401);

    const token = user.generateToken();
    const refreshToken = await user.generateRefreshToken();

    return res.standardResponse(200, true, { token, refreshToken }, 'User successfully logged in');
  } catch (error) {
    return next(error);
  }
};

const loginCooker = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Cooker.findOne({ email });

    // not user or invalid pass or role array does not contain cooker role
    if (!user || !(await user.comparePassword(password)))
      throw new CustomError('Invalid email or password', 401);

    const token = user.generateToken();
    const refreshToken = await user.generateRefreshToken();

    return res.standardResponse(200, true, { token, refreshToken }, 'User successfully logged in');
  } catch (error) {
    return next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    //User.verifyRefreshToken(refreshToken);
    if (!payload) throw new CustomError('Invalid refresh token', 401);

    let model = null;
    if (payload.type === 'eater') model = Eater;
    if (payload.type === 'cooker') model = Cooker;
    if (!model) throw new CustomError('Invalid refresh token', 401);

    const user = await model.findOne({ _id: payload.id });

    if (!user || !user.refreshToken.includes(refreshToken))
      throw new CustomError('Invalid refresh token', 401);

    const newToken = user.generateToken();
    const newRefreshToken = user.generateRefreshToken();

    return res.standardResponse(
      200,
      true,
      { newToken, newRefreshToken },
      'Token refreshed successfully'
    );
  } catch (error) {
    return next(error);
  }
};

export { registerEater, registerCooker, loginEater, loginCooker, refreshToken };
