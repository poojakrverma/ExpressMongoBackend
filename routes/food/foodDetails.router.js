import express from "express";
import { Create, GetAll, GetById, Update, UpdateStatus, GetAllFoodDetailsByRestrauntId, GetAllFoodDetailsByRestrauntIdB2C } from './../../controller/food/foodDetails.controller.js'
import { isAuthenticated } from "../../middlewares/auth.js";


const router = express.Router();

router.post('/SaveFoodDetails', isAuthenticated, Create);

router.post('/UpdateFoodDetails', isAuthenticated, Update);

router.get('/GetAllFoodDetails', GetAll);

router.get('/GetFoodDetailsById/:id', GetById);

router.post('/UpdateStatus', isAuthenticated, UpdateStatus);

router.get('/GetAllFoodDetailsByRestrauntId', isAuthenticated, GetAllFoodDetailsByRestrauntId);

router.get('/GetAllFoodDetailsByRestrauntIdB2C/:reastraunt_id', GetAllFoodDetailsByRestrauntIdB2C);

export default router;