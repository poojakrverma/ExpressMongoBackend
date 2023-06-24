import mongoose from "mongoose";
import { RestrauntMaster } from "./restraunt.model.js";

const schema = new mongoose.Schema({
  restraunt_daily_login_id: {
    type: mongoose.Schema.Types.ObjectId,
    alias: '_id' // Map 'restraunt_daily_login_id' field to '_id'
  },
  restraunt_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: RestrauntMaster, // Name of the referenced collection
    required: true,
  },
  date: {
    type: Date,
    required: true
  },
  login_time: {
    type: Date,
    required: true
  },
  logout_time: {
    type: Date,
    required: true
  },
  total_orders: {
    type: Number,
    required: true
  },
  total_orders_value: {
    type: Number,
    required: true
  },
  total_completed_order: {
    type: Number,
    required: true
  },
  total_completed_orders_value: {
    type: Number,
    required: true
  },
  total_cancelled_orders: {
    type: Number,
    required: true
  },
  total_cancelled_orders_value: {
    type: Number,
    required: true
  },
  total_unconfirmed_orders: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  is_active: {
    type: Boolean,
    default: true
  },
  created_on: {
    type: Date,
    default: Date.now
  },
  created_by: {
    type: String,
    required: true
  },
  updated_on: {
    type: Date,
    default: Date.now
  },
  updated_by: {
    type: String,
    required: true
  }
});

export const RestrauntDailyLogin = mongoose.model("RestrauntDailyLogin", schema);
