import mongoose, { Schema, model } from 'mongoose';
import { Orders } from './order.model.js';

const orderCancellationSchema = new mongoose.Schema({
  order_cancellation_id: {
    type: mongoose.Schema.Types.ObjectId,
    alias: '_id' // Map 'order_cancellation_id' field to '_id'
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Orders, // Name of the referenced collection
    required: true,
  },
  cancellation_by: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  cancellation_time: {
    type: Date,
    required: true
  },
  is_food_prepared: {
    type: Boolean,
    required: true
  },
  cancellation_duration: {
    type: String,
    required: true
  }
});

export const OrderCancellation = model('OrderCancellation', orderCancellationSchema);

