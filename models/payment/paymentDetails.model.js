import mongoose, { Schema, model } from 'mongoose';

const paymentDetailsSchema = new mongoose.Schema({
  payment_detail_id: { type: String, required: true },
  payment_api_id: { type: String, required: true },
  payment_link_id: { type: String, required: true },
  order_id: { type: String, required: true },
  payment_for: { type: String, required: true },
  payment_time: { type: Date, required: true },
  is_payment_confirmed: { type: Boolean, required: true },
  created_by: { type: String, required: true },
  created_on: { type: Date, required: true },
  updated_by: { type: String, required: true },
  updated_on: { type: Date, required: true }
});

export const PaymentDetails = model('PaymentDetails', paymentDetailsSchema);
