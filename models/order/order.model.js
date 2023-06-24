import mongoose, { Schema, model } from "mongoose";
import { FoodCategory } from "../food/foodCategory.model.js";
import { CustomerMaster } from "../customer/cutomerMaster.model.js";
import { RestrauntMaster } from "../restraunt/restraunt.model.js";

const OrderItemsSchema = new mongoose.Schema({
  order_item_id: {
    type: mongoose.Schema.Types.ObjectId,
    alias: '_id' // Map 'order_item_id' field to '_id'
  },
  food_category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: FoodCategory, // Name of the referenced collection
    required: true,
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
    type: mongoose.Schema.Types.ObjectId,
    alias: '_id', // Map 'order_id' field to '_id' 
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: CustomerMaster, // Name of the referenced collection
    required: true,
  },
  restraunt_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: RestrauntMaster, // Name of the referenced collection
    required: true,
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
    require: true,
    enum: {
      values: [1, 2, 3, 4, 5],
      message: '{VALUE} is not supported for order status'
    }
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
// export const OrderItems = model('OrderItems', OrderItemsSchema);
