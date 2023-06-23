import mongoose, { Schema, model } from "mongoose";

const OrderItemsSchema = new mongoose.Schema({
  order_item_id: {
    type: String,
    required: true,
    unique: true,
  },
  order_id: {
    type: String,
    required: true,
  },
  food_category_id: {
    type: String,
  },
  order_item_name: {
    type: String,
  },
  order_item_qty: {
    type: Number,
  },
  order_item_price: {
    type: Number,
  },
  order_item_total_price: {
    type: Number,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  created_on: {
    type: Date,
    default: Date.now,
  },
  created_by: {
    type: String,
  },
  updated_on: {
    type: Date,
    default: Date.now,
  },
  updated_by: {
    type: String,
  },
});

const OrdersSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
    unique: true,
  },
  customer_id: {
    type: String,
  },
  restraunt_id: {
    type: String,
  },
  order_details: {
    type: String,
  },
  total_price: {
    type: Number,
  },
  discount: {
    type: String,
  },
  delivery_address: {
    type: String,
  },
  notes: {
    type: String,
  },
  delivery_by: {
    type: Date,
  },
  executive_id: {
    type: String,
  },
  order_status: {
    type: Number,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  created_on: {
    type: Date,
    default: Date.now,
  },
  created_by: {
    type: String,
  },
  updated_on: {
    type: Date,
    default: Date.now,
  },
  updated_by: {
    type: String,
  },
  OrderItems: {
    type: [OrderItemsSchema],
  },
  json_order_items: {
    type: String,
  },
});

export const Orders = model('Orders', OrdersSchema);
export const OrderItems = model('OrderItems', OrderItemsSchema);
