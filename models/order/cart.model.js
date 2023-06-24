import mongoose, { Schema, model } from 'mongoose';
import { RestrauntMaster } from '../restraunt/restraunt.model.js';

const cartItemsSchema = new mongoose.Schema({
  food_detail_id: {
    type: mongoose.Schema.Types.ObjectId,
    alias: '_id' // Map 'food_detail_id' field to '_id'
  },
  restraunt_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: RestrauntMaster, // Name of the referenced collection
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
    type: mongoose.Schema.Types.ObjectId,
    alias: '_id', // Map 'session_id' field to '_id' 
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
  },
  mobile: {
    type: String,
  },
});

export const Cart = mongoose.model("Cart", cartSchema);
// export const CartItems = mongoose.model("CartItems", cartItemsSchema);
