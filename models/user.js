import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user_id: {
        type: String,
        unique: true,
        required: true
    },
    role_id: {
        type: Number,
        required: true,
        enum: {
            values: [1, 2, 3, 4],
            message: `{VALUE} is not supported`,
        },
    },
    name: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function (value) {
                // Regular expression for email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            },
            message: `Invalid email address - {VALUE}`
        }
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    jwt_id: {
        type: String,
        select: true
    },
    jwt_token: {
        type: String,
        select: true
    },
    refresh_token: {
        type: String,
        select: true
    },
    refresh_token_expire_at: {
        type: Date,
        select: true
    },
    is_active: {
        type: Boolean,
        default: false
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

export const User = mongoose.model('User', schema);
