import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    cooker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    cuisine: {
      type: String,
      required: true,
      enum: ['african', 'chinese', 'indian', 'italian', 'japanese', 'mexican', 'middle eastern'] // TODO: add more and move to app config
    },
    images: [
      {
        type: String
      }
    ],
    available: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false
    }
  }
);

const Item = mongoose.model('Item', itemSchema);

export default Item;
