import { Schema, model } from 'mongoose';

const customerAddressSchema = new Schema({
  customer_address_id: {
    type: String,
    required: true,
    unique: true
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

export const CustomerAddress = model('CustomerAddress', customerAddressSchema);

