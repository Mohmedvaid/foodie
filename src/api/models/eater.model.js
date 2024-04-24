// src/api/models/eater.js
import mongoose from 'mongoose';
import baseUserSchema from './baseUser.model';

const eaterSchema = new mongoose.Schema({
  ...baseUserSchema.obj,
  type: {
    type: String,
    default: 'eater'
  }
});

export default mongoose.model('Eater', eaterSchema);
