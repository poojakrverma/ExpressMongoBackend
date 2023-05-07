import mongoose, { Schema, model } from 'mongoose';


const stateSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
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
        type: String
    },
    state_code: {
        type: String
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    }
});


const State = mongoose.model('State', stateSchema);

module.exports = State;