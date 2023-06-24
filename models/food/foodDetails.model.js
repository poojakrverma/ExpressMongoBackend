import mongoose, { Schema, model } from 'mongoose';
import { FoodCategory } from './foodCategory.model.js';
import { RestrauntMaster } from '../restraunt/restraunt.model.js';

const foodDetailsSchema = new mongoose.Schema({
    food_detail_id: {
        type: mongoose.Schema.Types.ObjectId,
        alias: '_id'
    }, // Map 'customer_address_id' field to '_id' 
    food_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: FoodCategory, // Name of the referenced collection
        required: true,
    },
    reastraunt_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: RestrauntMaster, // Name of the referenced collection
        required: true,
    },
    food_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    food_type: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        required: true
    },
    created_on: {
        type: Date,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    updated_on: {
        type: Date,
        required: true
    },
    updated_by: {
        type: String,
        required: true
    }
});

export const FoodDetails = model('FoodDetails', foodDetailsSchema);
