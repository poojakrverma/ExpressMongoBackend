import express from "express";
import { Create, GetAll, GetById, Update } from './../../controller/food/foodDetails.controller.js'
import { isAuthenticated } from "../../middlewares/auth.js";


const router = express.Router();

router.post('/SaveFoodDetails', isAuthenticated, Create);

router.post('/UpdateFoodDetails', isAuthenticated, Update);

router.get('/GetAllFoodDetails', GetAll);

router.get('/GetFoodDetailsById/:id', GetById);


export default router;