import mongoose, { Schema, model } from 'mongoose';

const foodCategorySchema = new mongoose.Schema({
  food_category_id: {
    type: mongoose.Schema.Types.ObjectId,
    alias: '_id' // Map 'food_category_id' field to '_id'
  },
  food_category_name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
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

export const FoodCategory = model('FoodCategory', foodCategorySchema);
