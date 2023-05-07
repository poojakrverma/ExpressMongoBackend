import express from "express";
import { GetAllCitiesByCountryCode, GetAllCitiesByStateCode, GetAllCountries, GetAllStateByCountryCode } from "../../controller/comman/area.js";

const router = express.Router();

router.get('/GetAllCountries', GetAllCountries)

router.get('/GetAllStatesByCountryCode/:country_code', GetAllStateByCountryCode)

router.get('/GetAllCitiesByCountryCode/:country_code', GetAllCitiesByCountryCode)

router.get('/GetAllCitiesByStateCode/:state_code', GetAllCitiesByStateCode)


export default router;