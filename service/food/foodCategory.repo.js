import { FoodCategory } from "../../models/food/foodCategory.model";

class FoodCategoryRepository {
    async SaveFoodCategory(category) {
        try {
            const newCategory = new FoodCategory(category);
            await newCategory.save();
            return { success: true, message: 'Food category saved successfully', data: newCategory };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async UpdateFoodCategory(foodCategory) {
        try {
            const updatedCategory = await FoodCategory.findByIdAndUpdate(foodCategory.id, foodCategory, { new: true });
            if (!updatedCategory) {
                return { success: false, message: `Food category with id ${foodCategory.id} not found` };
            }
            return { success: true, message: 'Food category updated successfully', data: updatedCategory };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

    async DeleteFoodCategory(id) {
        try {
            const deletedCategory = await FoodCategory.findByIdAndDelete(id);
            if (!deletedCategory) {
                return { success: false, message: `Food category with id ${id} not found` };
            }
            return { success: true, message: 'Food category deleted successfully' };
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
            const category = await FoodCategory.findById(id);
            if (!category) {
                return { success: false, message: `Food category with id ${id} not found` };
            }
            return { success: true, data: category };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}

module.exports = FoodCategoryRepository;