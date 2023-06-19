import FoodDetailRepository from "../../service/food/foodDetails.repo.js";

const _foodDetailsRepository = new FoodDetailRepository();

export const Create = async (req, res) => {
    try {
        const ressult = await _foodDetailsRepository.SaveFoodDetails(req.body, req);
        return res.status(200).json(ressult);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}

export const Update = async (req, res) => {
    try {
        const result = await _foodDetailsRepository.UpdateFoodDetails(req.body, req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}

export const GetAll = async (req, res) => {
    try {
        const result = await _foodDetailsRepository.GetAllFoodDetails();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}

export const GetById = async (req, res) => {
    try {
        const result = await _foodDetailsRepository.GetFoodDetailsById(req.params.id)
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}