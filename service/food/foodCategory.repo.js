import { FoodCategory } from "../../models/food/foodCategory.model.js";
import KeyGen from './../../utils/key.js'

export default class FoodCategoryRepository {

    constructor() {
    }

    async SaveFoodCategory(foodCategory, req) {
        try {
            console.log(req);
            foodCategory.food_category_id = KeyGen.GetKey();
            foodCategory.created_by = req.user.user_id;
            foodCategory.updated_by = req.user.user_id;
            console.log("foodCategory repo start");
            const newCategory = new FoodCategory(foodCategory);
            await newCategory.save();
            console.log("foodCategory repo end");
            return {
                success: true,
                message: "Food category saved successfully",
                data: newCategory,
            };
        } catch (error) {
            console.log("foodCategory repo exception");
            return { success: false, message: error.message };
        }
    }

    async UpdateFoodCategory(foodCategory, req) {
        try {
            const updatedCategory = await FoodCategory.findByIdAndUpdate(
                foodCategory.id,
                foodCategory,
                { new: true }
            );
            if (!updatedCategory) {
                return {
                    success: false,
                    message: `Food category with id ${foodCategory.id} not found`,
                };
            }
            return {
                success: true,
                message: "Food category updated successfully",
                data: updatedCategory,
            };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async DeleteFoodCategory(id, req) {
        try {
            const deletedCategory = await FoodCategory.findByIdAndDelete(id);
            if (!deletedCategory) {
                return {
                    success: false,
                    message: `Food category with id ${id} not found`,
                };
            }
            return { success: true, message: "Food category deleted successfully" };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async GetAllFoodCategroy() {
        try {
            const categories = await FoodCategory.find();
            return { success: true, data: categories };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async GetFoodCategroyById(id) {
        try {
            const category = await FoodCategory.findOne({ food_category_id: id });
            if (!category) {
                return {
                    success: false,
                    message: `Food category with id ${id} not found`,
                };
            }
            return { success: true, data: category };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}
