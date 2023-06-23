import mongoose, { Schema, model } from 'mongoose';

const paymentAPISchema = new mongoose.Schema({
  payment_api_id: {
    type: String,
    required: true,
    unique: true
  },
  payment_api_name: {
    type: String,
    required: true
  },
  payment_api_key: {
    type: String,
    required: true
  },
  payment_api_secret_key: {
    type: String,
    required: true
  },
  payment_url: {
    type: String,
    required: true
  },
  return_url: {
    type: String,
    required: true
  },
  is_active: {
    type: Boolean,
    default: true
  },
  created_by: {
    type: String,
    required: true
  },
  created_on: {
    type: Date,
    default: Date.now
  },
  updated_by: {
    type: String,
    required: true
  },
  updated_on: {
    type: Date,
    default: Date.now
  }
});

export const PaymentAPI = mongoose.model('PaymentAPI', paymentAPISchema);

