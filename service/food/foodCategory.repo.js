import mongoose from "mongoose";
import { FoodCategory } from "../../models/food/foodCategory.model.js";
import { Message } from "../../utils/constant.js";
import KeyGen from './../../utils/key.js'

export async function SaveFoodCategory(foodCategory, req) {
    try {
        foodCategory.created_by = req.user._id;
        foodCategory.updated_by = req.user._id;
        const newCategory = new FoodCategory(foodCategory);
        const resp = await newCategory.save();
        if (!resp) {
            return {
                status: false,
                message: Message.NotSaved
            }
        }

        return {
            status: true,
            message: "Food category saved statusfully",
            data: newCategory,
        };
    } catch (error) {
        console.log("foodCategory repo exception");
        return { status: false, message: error.message };
    }
}

export async function UpdateFoodCategory(foodCategory, req) {
    try {
        foodCategory.updated_by = req.user._id;
        const updatedCategory = await FoodCategory.findOneAndUpdate(
            { _id: foodCategory._id },
            foodCategory,
            { new: true }
        );
        if (!updatedCategory) {
            return {
                status: false,
                message: `Food category with id ${foodCategory.food_category_id} not found`,
            };
        }
        return {
            status: true,
            message: "Food category updated statusfully",
            data: updatedCategory,
        };
    } catch (error) {
        return { status: false, message: error.message };
    }
}

export async function DeleteFoodCategory(id, req) {
    try {
        const deletedCategory = await FoodCategory.findOneAndDelete({ food_category_id: id });
        if (!deletedCategory) {
            return {
                status: false,
                message: `Food category with id ${id} not found`,
            };
        }
        return { status: true, message: "Food category deleted statusfully" };
    } catch (error) {
        return { status: false, message: error.message };
    }
}

export async function GetAllFoodCategroy() {
    try {
        const categories = await FoodCategory.find();
        return { status: true, data: categories };
    } catch (error) {
        return { status: false, message: error.message };
    }
}

export async function GetFoodCategroyById(id) {
    try {
        const category = await FoodCategory.findOne({ _id: id });
        if (!category) {
            return {
                status: false,
                message: `Food category with id ${id} not found`,
            };
        }
        return { status: true, data: category };
    } catch (error) {
        return { status: false, message: error.message };
    }
}