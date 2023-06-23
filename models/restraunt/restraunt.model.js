import mongoose, { Schema, model } from "mongoose";
const RestrauntPhotoSchema = new mongoose.Schema({
    restraunt_photo_id: {
        type: String,
        required: true,
        unique: true
    },
    restraunt_id: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    created_on: {
        type: Date,
        default: Date.now
    },
    created_by: {
        type: String
    },
    updated_on: {
        type: Date,
        default: Date.now
    },
    updated_by: {
        type: String
    }
});

const RestrauntMasterSchema = new mongoose.Schema({
    restraunt_id: {
        type: String,
        required: true,
        unique: true
    },
    restraunt_name: {
        type: String,
        required: true
    },
    latitute: {
        type: String,
        required: true
    },
    longitute: {
        type: String,
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
    mobile_no: {
        type: String
    },
    email_id: {
        type: String
    },
    open_time: {
        type: String
    },
    close_time: {
        type: String
    },
    is_active: {
        type: Boolean,
        default: true
    },
    created_on: {
        type: Date,
        default: Date.now
    },
    created_by: {
        type: String
    },
    updated_on: {
        type: Date,
        default: Date.now
    },
    updated_by: {
        type: String
    },
    restraunt_photos: {
        type: [RestrauntPhotoSchema],
    },
    json_restraunt_photo: {
        type: String,
        select: false
    }
});

//const RestrauntPhoto = model('RestrauntPhoto', RestrauntPhotoSchema);
export const RestrauntMaster = model('RestrauntMaster', RestrauntMasterSchema);
// export default {
//     RestrauntPhoto,
//     RestrauntMaster
// };
