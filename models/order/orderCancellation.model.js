import { Schema, model } from 'mongoose';

const orderCancellationSchema = new Schema({
  order_cancellation_id: {
    type: String,
    required: true,
    unique: true
  },
  order_id: {
    type: String,
    required: true
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

const OrderCancellation = model('OrderCancellation', orderCancellationSchema);

export default OrderCancellation;
