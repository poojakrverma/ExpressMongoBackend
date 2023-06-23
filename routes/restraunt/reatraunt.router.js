import express from "express";
import { isAuthenticated } from "../../middlewares/auth.js";
import { DeleteRestrauntMaster, GetAllRestrauntByCityCode, GetAllRestrauntMaster, GetRestrauntDetailsById, GetRestrauntMasterById, SaveRestrauntMaster, SaveStatus, UpdateRestrauntMaster } from "../../controller/restraunt/restraunt.controller.js";

const router = express.Router();

router.get('/GetAllRestrauntMaster', isAuthenticated, GetAllRestrauntMaster);

router.get('/GetRestrauntMasterById', isAuthenticated, GetRestrauntMasterById);

router.get('/GetRestrauntDetailsById/:restraunt_id', GetRestrauntDetailsById);

router.get('/GetAllRestrauntByCityCode/:city_code', GetAllRestrauntByCityCode);

router.delete('/DeleteRestrauntMaster/:restraunt_id', DeleteRestrauntMaster);

router.post('/SaveRestrauntMaster', isAuthenticated, SaveRestrauntMaster);

router.post('/UpdateRestrauntMaster', isAuthenticated, UpdateRestrauntMaster);

router.post('/SaveStatus', isAuthenticated, SaveStatus);


export default router;