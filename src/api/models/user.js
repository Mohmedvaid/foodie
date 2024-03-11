// src/api/models/user.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  JWT_SECRET,
  JWT_EXPIRATION,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRATION
} from '../../config/app.config';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
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
    role: {
      type: String,
      default: 'eater',
      enum: ['eater', 'cooker']
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    refreshToken: [String]
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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      role: this.role
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRATION }
  );
};

userSchema.methods.generateRefreshToken = function () {
  const payload = {
    id: this._id,
    email: this.email,
    role: this.role
  };

  const refToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRATION });
  this.refreshToken.push(refToken);
  this.save();
  return refToken;
};

userSchema.methods.verifyToken = function (token) {
  return jwt.verify(token, JWT_SECRET);
};

userSchema.methods.verifyRefreshToken = function (token) {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
};

userSchema.methods.addRefreshToken = function (token) {
  this.refreshToken.push(token);
  return this.save();
};

userSchema.methods.removeRefreshToken = function (token) {
  this.refreshToken = this.refreshToken.filter((t) => t !== token);
  return this.save();
};

export default mongoose.model('User', userSchema);
