import FoodCategoryRepository from './../../service/food/foodCategory.repo.js';

class FoodCategoryController {

    constructor() {
        this.foodCategoryRepository = new FoodCategoryRepository();
    }

    async Create(req, res) {
        try {
            console.log("foodCategory controller start");
            // console.log(req.body);
            const result = await this.foodCategoryRepository.SaveFoodCategory(req.body, req);
            console.log("foodCategory controller end");
            return res.status(200).json(result);
        } catch (error) {
            console.log("foodCategory controller excp");
            return res.status(500).json({ message: error.message });
        }
    }

    async Update(req, res) {
        try {
            const result = await this.foodCategoryRepository.UpdateFoodCategory(req.body, req);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async Delete(req, res) {
        try {
            const result = await this.foodCategoryRepository.DeleteFoodCategory(req.params.id, req);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async GetAll(req, res) {
        try {
            const result = await this.foodCategoryRepository.GetAllFoodCategroy();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async GetById(req, res) {
        try {
            const result = await this.foodCategoryRepository.GetFoodCategroyById(req.params.id);
            console.log(req.params.id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default new FoodCategoryController();
