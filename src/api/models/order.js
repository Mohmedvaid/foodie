import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    eater: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Item',
          required: true
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ],

    status: {
      type: String,
      enum: ['placed', 'preparing', 'ready for pickup', 'on the way', 'delivered'],
      default: 'placed'
    },
    total: {
      type: Number,
      required: true
    },
    deliveryAddress: {
      // TODO add detailed structured address
      type: String,
      required: true
    },
    deliveryPhone: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false
    }
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
