import mongoose, { Schema, model } from 'mongoose';


const citySchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    state_id: {
        type: Number,
        required: true
    },
    state_code: {
        type: String,
        required: true
    },
    state_name: {
        type: String,
        required: true
    },
    country_id: {
        type: Number,
        required: true
    },
    country_code: {
        type: String,
        required: true
    },
    country_name: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    wikiDataId: {
        type: String
    }
});


export const City = mongoose.model('City', citySchema);
