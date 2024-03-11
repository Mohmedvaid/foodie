// src/api/controllers/auth.controller.js
import User from '../models/user';
import CustomError from '../../utils/CustomError';

const register = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new CustomError('User already exists', 409);

    const user = new User({ email, password, firstName, lastName });
    await user.save();

    return res.standardResponse(201, true, { userId: user._id }, 'User successfully registered');
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

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
    const payload = User.verifyRefreshToken(refreshToken);
    const user = await User.findById(payload.id);

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

export { register, login, refreshToken };
