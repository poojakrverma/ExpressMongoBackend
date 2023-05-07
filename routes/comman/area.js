import express from "express";
import { GetAllCountries } from "../../controller/comman/area.js";

const router = express.Router();

router.get('/GetAllCountries',GetAllCountries)



export default router;