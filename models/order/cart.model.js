import mongoose, { Schema, model } from 'mongoose';

const cartItemsSchema = new mongoose.Schema({
  food_detail_id: {
    type: String,
    required: true,
  },
  restraunt_id: {
    type: String,
    required: true,
  },
  food_name: {
    type: String,
    required: true,
  },
  food_type: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: String,
    required: false,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema({
  session_id: {
    type: String,
    required: true,
    unique: true,
  },
  food_details: {
    type: [cartItemsSchema],
    required: false
  },
  total_amount: {
    type: Number,
    required: true,
    default: 0,
  },
  json_food_details: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    required: true,
    default: true,
  },
  created_on: {
    type: Date,
    required: true,
    default: Date.now,
  },
  created_by: {
    type: String,
    required: false,
  },
  updated_on: {
    type: Date,
    required: false,
  },
  updated_by: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
});

export const Cart = mongoose.model("Cart", cartSchema);
export const CartItems = mongoose.model("CartItems", cartItemsSchema);
