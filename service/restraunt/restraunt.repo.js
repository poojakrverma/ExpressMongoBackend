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
        const currentDate = new Date().toISOString().split('T')[0];

        for (let i = 0; i < restrauntlist.length; i++) {
            const restraunt = restrauntlist[i];
            const objRestrauntLog = await RestrauntDailyLogin.findOne({
                restraunt_id: restraunt.restraunt_id,
                is_active: true,
                date: {
                    $eq: currentDate,
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


export async function GetAllRestrauntMaster() {
    try {
        const restrants = await RestrauntMaster.find().exec();

        if (restrants.length > 0) {
            return {
                status: true,
                message: Message.Fethched,
                data: restrants
            };
        } else {
            return {
                status: false,
                message: Message.WrongId,
                data: restrants
            };
        }
    } catch (error) {
        return {
            status: false,
            message: error,
            data: null
        };
    }
}


export async function GetRestrauntDetailsById(restraunt_id) {
    try {
        const restrant = await RestrauntMaster.findOne({ restraunt_id }).exec();

        if (restrant) {
            return {
                status: true,
                message: Message.Fethched,
                data: restrant
            };
        } else {
            return {
                status: false,
                message: Message.WrongId,
                data: restraunt_id
            };
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
        const restrant = await RestrauntMaster.findOne({ restraunt_id: req.user._id }).exec();

        if (restrant) {
            return {
                status: true,
                message: Message.Fethched,
                data: restrant
            };
        } else {
            return {
                status: false,
                message: Message.WrongId,
                data: req.user._id
            };
        }
    } catch (error) {
        return {
            status: false,
            message: error,
            data: null
        };
    }
}

export async function saveOrUpdateRestrauntMaster(restraunt, req) {
    try {
        if (!restraunt) {
            return {
                status: false,
                message: Message.InvalidData,
                data: null
            };
        }

        restraunt.is_active = true;
        restraunt.created_by = req.user._id;
        restraunt.created_on = new Date().toISOString();
        restraunt.updated_by = req.user._id;
        restraunt.updated_on = new Date().toISOString();

        const oldData = await RestrauntMaster.findOne({ restraunt_id: req.user._id });
        let resp
        if (oldData) {
            restraunt.created_by = req.user._id;
            restraunt.created_on = oldData.created_on;
            resp = await RestrauntMaster.updateOne({ restraunt_id: restraunt.restraunt_id }, restraunt);
        } else {
            resp = await RestrauntMaster.create(restraunt);
        }
        return {
            status: true,
            message: Message.Saved,
            data: resp
        };
    } catch (error) {
        return {
            status: false,
            message: error,
            data: null
        };
    }
}


export async function SaveStatus(status, req) {
    try {
        const data = await RestrauntMaster.findOneAndUpdate(
            { restraunt_id: status.Id },
            { is_active: status.Status, updated_by: req.user._id, updated_on: new Date().toISOString() }
        );

        if (data) {
            return {
                status: true,
                message: Message.StatusSaved,
                data: status
            };
        } else {
            return {
                status: false,
                message: Message.StatusNotSaved,
                data: null
            };
        }
    } catch (error) {
        return {
            status: false,
            message: error,
            data: null
        };
    }
}



