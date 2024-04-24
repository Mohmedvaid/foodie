// src/api/models/baseUser.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  JWT_SECRET,
  JWT_EXPIRATION,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRATION
} from '../../config/app.config';

const baseUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    refreshToken: [String],
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        delete ret.refreshToken;
        return ret;
      },
      versionKey: false
    },
    toObject: {
      transform: (doc, ret) => {
        delete ret.password;
        delete ret.refreshToken;
        return ret;
      }
    }
  }
);

baseUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password
baseUserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Generate token
baseUserSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRATION }
  );
};

// Generate refresh token
baseUserSchema.methods.generateRefreshToken = function () {
  const payload = {
    id: this._id,
    email: this.email
  };

  const refToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
  this.refreshToken.push(refToken);
  this.save();
  return refToken;
};

// Verify token
baseUserSchema.methods.verifyToken = function (token) {
  return jwt.verify(token, JWT_SECRET);
};

// Verify refresh token
baseUserSchema.methods.verifyRefreshToken = function (token) {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
};

// Remove refresh token from user's list of refresh tokens
baseUserSchema.removeRefreshToken = function (token) {
  this.refreshToken = this.refreshToken.filter((refToken) => refToken !== token);
  this.save();
};

export default baseUserSchema;
