import * as _restraunt from "../../service/restraunt/restraunt.repo.js";



export const GetAllRestrauntMaster = async (req, res) => {
    try {
        const result = await _restraunt.GetAllRestrauntMaster(req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}

export const GetRestrauntMasterById = async (req, res) => {
    try {
        const result = await _restraunt.GetRestrauntMasterById(req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}

export const GetRestrauntDetailsById = async (req, res) => {
    try {
        const result = await _restraunt.GetRestrauntDetailsById(req.params.restraunt_id, req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}

export const GetAllRestrauntByCityCode = async (req, res) => {
    try {
        const result = await _restraunt.GetAllRestrauntByCityCode(req.params.city_code, req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}

export const DeleteRestrauntMaster = async (req, res) => {
    try {
        const result = await _restraunt.DeleteRestrauntMaster(req.params.restraunt_id, req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}

export const SaveRestrauntMaster = async (req, res) => {
    try {
        const result = await _restraunt.SaveRestrauntMaster(req.body, req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}

export const UpdateRestrauntMaster = async (req, res) => {
    try {
        const result = await _restraunt.UpdateRestrauntMaster(req.body, req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}

export const SaveStatus = async (req, res) => {
    try {
        const result = await _restraunt.SaveStatus(req.body, req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}