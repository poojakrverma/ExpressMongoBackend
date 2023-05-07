import { Schema, model } from 'mongoose';

const customerMasterSchema = new Schema({
    customer_id: { type: String, required: true },
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
});

export const CustomerMaster = model('CustomerMaster', customerMasterSchema);

