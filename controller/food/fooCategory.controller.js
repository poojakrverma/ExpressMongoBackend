import * as _FoodCategoryRepository from './../../service/food/foodCategory.repo.js';

export const Create = async (req, res) => {
    try {
        console.log("foodCategory controller start");
        // console.log(req.body);
        const result = await _FoodCategoryRepository.SaveFoodCategory(req.body, req);
        console.log("foodCategory controller end");
        return res.status(200).json(result);
    } catch (error) {
        console.log("foodCategory controller excp");
        return res.status(500).json({ message: error.message });
    }
}

export const Update = async (req, res) => {
    try {
        const result = await _FoodCategoryRepository.UpdateFoodCategory(req.body, req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const Delete = async (req, res) => {
    try {
        const result = await _FoodCategoryRepository.DeleteFoodCategory(req.params.id, req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const GetAll = async (req, res) => {
    try {
        const result = await _FoodCategoryRepository.GetAllFoodCategroy();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const GetById = async (req, res) => {
    try {
        const result = await _FoodCategoryRepository.GetFoodCategroyById(req.params.id);
        console.log(req.params.id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
