import mongoose, { Schema, model } from 'mongoose';

const customerAddressSchema = new Schema({
    customer_address_id: {
        type: mongoose.Schema.Types.ObjectId,
        alias: '_id' // Map 'customer_address_id' field to '_id'
    },
    customer_id: {
        type: String,
        required: true
    },
    address_type: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city_code: {
        type: String,
        required: true
    },
    state_code: {
        type: String,
        required: true
    },
    country_code: {
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

const customerMasterSchema = new mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, alias: '_id' }, // Map 'userId' field to '_id' 
    customer_name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    is_signup: { type: Boolean, required: true },
    password: { type: String, required: true },
    is_active: { type: Boolean, required: true },
    created_on: { type: Date, required: true },
    created_by: { type: String, required: true },
    updated_on: { type: Date, required: true },
    updated_by: { type: String, required: true },
    customer_address: { type: [customerAddressSchema] }
});
export const CustomerMaster = model('CustomerMaster', customerMasterSchema);
