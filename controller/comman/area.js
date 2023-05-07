import { Country } from './../../models/area/country.js'

export const GetAllCountries = async (req, res, next) => {
    const countries = await Country.find();
    res.json({
        success: true,
        countries
    })
}