import mongoose from "mongoose";

export default class KeyGen {
    // Generates a unique key based on the current UTC date and time
    static GetKey() {
        const date = new Date();
        const key = date.getUTCFullYear().toString() +
            ('0' + (date.getUTCMonth() + 1)).slice(-2) +
            ('0' + date.getUTCDate()).slice(-2) +
            ('0' + date.getUTCHours()).slice(-2) +
            ('0' + date.getUTCMinutes()).slice(-2) +
            ('0' + date.getUTCSeconds()).slice(-2) +
            ('0' + date.getUTCMilliseconds()).slice(-3) +
            Math.floor(Math.random() * 10);
        return key;
    }
}


export const generateUniqueKey = () => {
    return mongoose.Types.ObjectId();
};