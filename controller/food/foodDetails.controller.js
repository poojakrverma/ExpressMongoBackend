import { raw } from "express";
import * as _foodDetailsRepository from "../../service/food/foodDetails.repo.js";

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

export const UpdateStatus = async (req, res) => {
    try {
        const result = await _foodDetailsRepository.UpdateFoodDetailStatus(req.body, req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}

export const GetAllFoodDetailsByRestrauntId = async (req, res) => {
    try {
        const result = await _foodDetailsRepository.GetAllFoodDetailsByRestrauntId(req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}

export const GetAllFoodDetailsByRestrauntIdB2C = async (req, res) => {
    try {
        const result = await _foodDetailsRepository.GetAllFoodDetailsByRestrauntIdB2C(req.params.reastraunt_id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}