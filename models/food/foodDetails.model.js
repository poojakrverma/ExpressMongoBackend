import mongoose, { Schema, model } from 'mongoose';

const foodDetailsSchema = new mongoose.Schema({
    food_detail_id: { type: String, required: true, unique: true },
    food_category_id: { type: String, required: true },
    reastraunt_id: { type: String, required: true },
    food_name: { type: String, required: true },
    description: { type: String, required: true },
    food_type: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: String, required: true },
    is_active: { type: Boolean, required: true },
    created_on: { type: Date, required: true },
    created_by: { type: String, required: true },
    updated_on: { type: Date, required: true },
    updated_by: { type: String, required: true }
});

export const FoodDetails = model('FoodDetails', foodDetailsSchema);
