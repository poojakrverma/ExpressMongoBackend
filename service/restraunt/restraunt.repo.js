import { RestrauntMaster } from "../../models/restraunt/restraunt.model.js";
import { RestrauntDailyLogin } from "../../models/restraunt/restrauntDailyLogin.model.js";
import { Message } from "../../utils/constant.js";


export async function DeleteRestrauntMaster(restraunt_id, req) {
    try {
        const response = {
            status: false,
            message: '',
            data: null
        };

        const data = await RestrauntMaster.findOne({ restraunt_id });

        if (data) {
            await data.remove();

            // const photoList = await RestrauntPhoto.find({ restraunt_id });
            // await RestrauntPhoto.deleteMany({ restraunt_id });

            response.status = true;
            response.message = Message.Deleted;
            return response;
        }

        response.message = Message.WrongId;
        return response;
    } catch (error) {
        return {
            status: false,
            message: error,
            data: null
        };
    }
}


export async function GetAllRestrauntByCityCode(cityCode, req) {
    try {
        const response = {
            status: false,
            message: '',
            data: null
        };

        const onlineRestraunt = [];
        const restrauntlist = await RestrauntMaster.find({ city_code: cityCode, is_active: true }).exec();

        for (let i = 0; i < restrauntlist.length; i++) {
            const restraunt = restrauntlist[i];
            const objRestrauntLog = await RestrauntDailyLogin.findOne({
                restraunt_id: restraunt.restraunt_id,
                is_active: true,
                date: {
                    $eq: new Date().toISOString().split('T')[0],
                },
            }).exec();

            if (objRestrauntLog) {
                onlineRestraunt.push(restraunt);
            }
        }

        if (onlineRestraunt.length > 0) {
            response.status = true;
            response.data = onlineRestraunt;
            response.message = Message.Fethched;
            return response;
        }

        response.message = Message.NotFetch;
        return response;
    } catch (error) {
        return {
            status: false,
            message: error,
            data: null
        };
    }
}


export async function GetAllRestrauntMaster(req) {
    try {
        const response = {
            status: false,
            message: '',
            data: null
        };

        const restrants = await RestrauntMaster.find().exec();

        if (restrants != null && restrants.length > 0) {
            // for (let i = 0; i < restrants.length; i++) {
            //     const restraunt = restrants[i];
            //     const photoList = await RestrauntPhoto.find({ restraunt_id: restraunt.restraunt_id }).exec();
            //     restraunt.restraunt_photos = photoList;
            // }

            response.status = true;
            response.message = Message.Fetched;
            response.data = restrants;
            return response;
        } else {
            response.message = Message.WrongId;
            response.data = restrants;
            return response;
        }
    } catch (error) {
        return {
            status: false,
            message: error,
            data: null
        };
    }
}

export async function GetRestrauntDetailsById(restraunt_id, req) {
    try {
        const response = {
            status: false,
            message: '',
            data: null
        };

        const restrant = await RestrauntMaster.findOne({ restraunt_id }).exec();
        if (restrant != null) {
            //restrant.restraunt_photos = await RestrauntPhoto.find({ restraunt_id }).exec();

            response.status = true;
            response.message = Message.Fethched;
            response.data = restrant;
            return response;
        } else {
            response.message = Message.WrongId;
            response.data = req.user._user_id;
            return response;
        }
    } catch (error) {
        return {
            status: false,
            message: error,
            data: null
        };
    }
}

export async function GetRestrauntMasterById(req) {
    try {
        const response = {
            status: false,
            message: '',
            data: null
        };

        const restrant = await RestrauntMaster.findOne({ restraunt_id: req.user.user_id }).exec();
        if (restrant != null) {
            //restrant.restraunt_photos = await RestrauntPhoto.find({ restraunt_id: restrant.restraunt_id }).exec();

            response.status = true;
            response.message = Message.Fethched;
            response.data = restrant;
            return response;
        } else {
            response.message = Message.WrongId;
            response.data = req.user._user_id;
            return response;
        }
    } catch (error) {
        return {
            status: false,
            message: error,
            data: null
        };
    }
}


export async function SaveRestrauntMaster(restraunt, req) {
    try {
        const response = {
            status: false,
            message: '',
            data: null
        };
        restraunt.is_active = true;
        restraunt.created_by = req.user._id;
        restraunt.created_on = new Date().toISOString();
        restraunt.updated_by = req.user._id;
        restraunt.updated_on = new Date().toISOString();

        const savedRestraunt = await RestrauntMaster.create(restraunt);
        if (savedRestraunt) {
            response.status = true;
            response.message = Message.Saved;
            response.data = savedRestraunt;
            return response;
        } else {
            response.message = Message.NotSaved;
            return response;
        }
    } catch (error) {
        console.log(error)
        return {
            status: false,
            message: error,
            data: null
        };
    }
}

export async function SaveStatus(status, req) {
    try {
        const response = {
            status: false,
            message: '',
            data: null
        };

        const data = await RestrauntMaster.find({ restraunt_id: status.Id });
        if (data) {
            data.is_active = status.Status;
            data.updated_by = req.user.user_id;
            data.updated_on = new Date().toISOString();

            const updatedData = await data.save();
            if (updatedData) {
                response.status = true;
                response.message = Message.StatusSaved;
                response.data = status;
                return response;
            } else {
                response.message = Message.StatusNotSaved;
                return response;
            }
        } else {
            response.message = Message.WrongId;
            return response;
        }
    } catch (error) {
        return {
            status: false,
            message: error,
            data: null
        };
    }
}


export async function UpdateRestrauntMaster(restraunt, req) {
    try {
        const response = {
            status: false,
            message: '',
            data: null
        };

        if (restraunt) {
            restraunt.restraunt_id = req.user.user_id;
            restraunt.is_active = true;
            restraunt.created_by = req.user.user_id;
            restraunt.created_on = new Date().toISOString();
            restraunt.updated_by = req.user.user_id;
            restraunt.updated_on = new Date().toISOString();

            const oldData = await RestrauntMaster.find({ restraunt_id: req.user.user_id });
            if (oldData) {
                restraunt.created_by = req.user.user_id;
                restraunt.created_on = oldData.created_on;
                await RestrauntMaster.updateOne({ restraunt_id: restraunt.restraunt_id }, restraunt);
            } else {
                await RestrauntMaster.create(restraunt);
            }

            response.status = true;
            response.message = Message.Saved;
            response.data = restraunt;
            return response;
        } else {
            response.message = Message.InvalidData;
            return response;
        }
    } catch (error) {
        return {
            status: false,
            message: error,
            data: null
        };
    }
}