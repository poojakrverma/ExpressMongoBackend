import express from "express";
import { Create } from './../../controller/food/foodDetails.controller.js'
import { isAuthenticated } from "../../middlewares/auth.js";


const router = express.Router();

router.post('/SaveFoodDetails', isAuthenticated, Create);




export default router;