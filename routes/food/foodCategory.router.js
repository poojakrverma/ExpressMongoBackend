import express from "express";
import { Create, Update, Delete, GetAll, GetById } from "./../../controller/food/fooCategory.controller.js";
import { isAuthenticated } from "../../middlewares/auth.js";


const router = express.Router();

router.post('/SaveFooodCategory', isAuthenticated, Create);

router.post('/UpdateFooodCategory', isAuthenticated, Update);

router.delete('/DeleteFoodCategory', isAuthenticated, Delete);

router.get('/GetFoodCategroryById/:id', GetById);

router.get('/GetAllFoodCategory', GetAll);


export default router;