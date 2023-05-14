import mongoose from "mongoose";


const schema = new mongoose.Schema({
    user_id: {
        type: String,
        unique: true,
        require: true
    },
    role_id: {
        type: String,
    },
    name: {
        type: String,
        unique: true,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        select: false,
        require: true,
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

export const User = mongoose.model("User", schema);