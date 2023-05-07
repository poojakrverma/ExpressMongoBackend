import mongoose, { Schema, model } from 'mongoose';

const timezonesSchema = new Schema({
    zoneName: {
        type: String,
    },
    gmtOffset: {
        type: Number,
    },
    gmtOffsetName: {
        type: String,
    },
    abbreviation: {
        type: String,
    },
    tzName: {
        type: String,
    },
});

const translationsSchema = new Schema({
    kr: {
        type: String,
    },
    ptBR: {
        type: String,
    },
    pt: {
        type: String,
    },
    nl: {
        type: String,
    },
    hr: {
        type: String,
    },
    fa: {
        type: String,
    },
    de: {
        type: String,
    },
    es: {
        type: String,
    },
    fr: {
        type: String,
    },
    ja: {
        type: String,
    },
    it: {
        type: String,
    },
    cn: {
        type: String,
    },
    tr: {
        type: String,
    },
});

const countrySchema = new Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
    },
    iso3: {
        type: String,
    },
    iso2: {
        type: String,
    },
    numeric_code: {
        type: String,
    },
    phone_code: {
        type: String,
    },
    capital: {
        type: String,
    },
    currency: {
        type: String,
    },
    currency_name: {
        type: String,
    },
    currency_symbol: {
        type: String,
    },
    tld: {
        type: String,
    },
    native: {
        type: String,
    },
    region: {
        type: String,
    },
    subregion: {
        type: String,
    },
    timezones: {
        type: [timezonesSchema],
    },
    timezones_json: {
        type: String,
    },
    translations: {
        type: [translationsSchema],
    },
    translations_json: {
        type: String,
    },
    latitude: {
        type: String,
    },
    longitude: {
        type: String,
    },
    emoji: {
        type: String,
    },
    emojiU: {
        type: String,
    },
});



export const Country = mongoose.model('Country', countrySchema);
