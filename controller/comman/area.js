import ErrorHandler from '../../middlewares/error.js';
import { Country } from './../../models/area/country.js'
import { State } from './../../models/area/state.js'
import { City } from './../../models/area/city.js'

export const GetAllCountries = async (req, res, next) => {
    const countries = await Country.find();
    res.json({
        success: true,
        countries
    })
}

export const GetAllStateByCountryCode = async (req, res, next) => {
    try {
        const country_code = req.params.country_code;
        if (!country_code) {
            return next(new ErrorHandler("country code is required", 400));
        }
        const states = await State.find({ country_code: country_code });
        if (!states) {
            return next(new ErrorHandler("invalid country code", 204));
        }

        res.status(200).json({
            success: true,
            states
        })
    } catch (error) {
        next(error);
    }
}


export const GetAllCitiesByStateCode = async (req, res, next) => {
    try {
        const state_code = req.params.state_code;
        if (!state_code) {
            return next(new ErrorHandler("state code is required", 400));
        }
        const cities = await City.find({ state_code: state_code });
        if (!cities) {
            return next(new ErrorHandler("invalid state code", 204));
        }

        res.status(200).json({
            success: true,
            cities
        })
    } catch (error) {
        next(error);
    }
}

export const GetAllCitiesByCountryCode = async (req, res, next) => {
    try {
        const country_code = req.params.country_code;
        if (!country_code) {
            return next(new ErrorHandler("country code is required", 400));
        }
        const cities = await City.find({ country_code: country_code });
        if (!cities) {
            return next(new ErrorHandler("invalid country code", 204));
        }

        res.status(200).json({
            success: true,
            cities
        })
    } catch (error) {
        next(error);
    }
}