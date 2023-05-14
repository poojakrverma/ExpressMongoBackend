import express from "express";
import foodCategoryController from "./../../controller/food/fooCategory.controller.js";
import { isAuthenticated } from "../../middlewares/auth.js";


const router = express.Router();

router.post('/SaveFooodCategory', isAuthenticated, async (req, res) => {
    return res = foodCategoryController.Create(req, res);
});

router.get('/GetFoodCategroryById/:id', async (req, res) => {
    return foodCategoryController.GetById(req, res);
})


export default router;