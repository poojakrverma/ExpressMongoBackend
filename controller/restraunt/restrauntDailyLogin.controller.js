import * as _restrauntDailyLoginRepo from "../../service/restraunt/restrauntDailyLogin.repo.js";



export const GetAllTodayOrderDetails = async (req, res) => {
    try {
        const result = await _restrauntDailyLoginRepo.GetAllTodayOrderDetails(req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}

export const GetRestrauntStatus = async (req, res) => {
    try {
        const result = await _restrauntDailyLoginRepo.GetRestrauntStatus(req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}

export const OfflineRestraunt = async (req, res) => {
    try {
        const result = await _restrauntDailyLoginRepo.OfflineRestraunt(req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}

export const OnlineRestraunt = async (req, res) => {
    try {
        const result = await _restrauntDailyLoginRepo.OnlineRestraunt(req.body, req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}

export const UpdateCancelledOrder = async (req, res) => {
    try {
        const result = await _restrauntDailyLoginRepo.UpdateCancelledOrder(req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}

export const UpdateCompletedOrder = async (req, res) => {
    try {
        const result = await _restrauntDailyLoginRepo.UpdateCompletedOrder(req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}

export const UpdateTotalOrder = async (req, res) => {
    try {
        const result = await _restrauntDailyLoginRepo.UpdateTotalOrder(req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}