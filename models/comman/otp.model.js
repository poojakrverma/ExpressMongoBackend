import mongoose, { Schema, model } from 'mongoose';

const otpSchema = new mongoose.Schema({
    OtpId: {
        type: String,
        required: true,
        unique: true
    },
    OTP: {
        type: String,
        required: true
    },
    UserId: {
        type: String,
        required: true
    },
    OtpTime: {
        type: Date,
        required: true
    },
    OtpExpiryTime: {
        type: Date,
        required: true
    },
    Email: {
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

const confirmOtpSchema = new mongoose.Schema({
    OtpId: {
        type: String,
        required: true
    },
    UserId: {
        type: String,
        required: true
    },
    OTP: {
        type: String,
        required: true
    }
});

export const OTP = model('OtpDto', otpSchema);
export const ConfirmOTP = model('ConfirmOTP', confirmOtpSchema);
