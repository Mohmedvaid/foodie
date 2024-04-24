// src/api/models/cooker.js
import mongoose from 'mongoose';
import baseUserSchema from './baseUser.model';

const cookerSchema = new mongoose.Schema({
  ...baseUserSchema.obj,
  type: {
    type: String,
    default: 'cooker'
  }
});

export default mongoose.model('Cooker', cookerSchema);
