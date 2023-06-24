import { RestrauntDailyLogin } from './../../models/restraunt/restrauntDailyLogin.model.js'
import { Orders } from './../../models/order/order.model.js'
import { Message } from '../../utils/constant.js';
import KeyGen from '../../utils/key.js';

export async function GetAllTodayOrderDetails(req) {
    try {
        const orderList = Orders.find(
            {
                restraunt_id: req.user._id,
                created_on: {
                    $eq: new Date().toISOString().split('T')[0]
                }
            }
        );
        if (orderList.count > 0) {
            return {
                status: true,
                message: Message.Fethched,
                data: orderList
            }
        } else {
            return {
                status: false,
                message: Message.NotFetch,
                data: null
            }
        }
    } catch (error) {
        return {
            status: false,
            message: error
        }
    }
}

export async function GetRestrauntStatus(req) {
    try {
        const restrauntObj = await RestrauntDailyLogin.findOne({ restraunt_id: req.user._id });
        if (restrauntObj) {
            return {
                status: true,
                message: Message.Fethched,
                data: restrauntObj
            }
        } else {
            return {
                status: false,
                message: Message.NotFetch,
                data: null
            }
        }
    } catch (error) {
        return {
            status: false,
            message: error
        }
    }
}

export async function OfflineRestraunt(restrauntDailyLogin, req) {
    try {
        if (!restrauntDailyLogin) {
            return {
                status: false,
                message: Message.InvalidData
            }
        }
        const restrauntDailyLoginObj = await RestrauntDailyLogin.findOneAndUpdate(
            {
                restraunt_id: restrauntDailyLogin.restraunt_id,
                created_on: {
                    $eq: new Date().toISOString().split('T')[0],
                },
            },
            {
                logout_time: new Date().toISOString(),
                is_active: false,
                updated_by: req.user._id,
                updated_on: new Date().toISOString(),
            }
        );
        if (restrauntDailyLoginObj) {
            return {
                status: true,
                message: 'Restraunt Logout Successfull',
            };
        } else {
            return {
                status: false,
                message: Message.NotUpdated,
            };
        }
    } catch (error) {
        return {
            status: false,
            message: error
        }
    }
}

export async function OnlineRestraunt(restrauntDailyLogin, req) {
    try {
        if (!restrauntDailyLogin) {
            response.respMsg = Message.InvalidData;
            return response;
        }

        const objRestrant = await RestrauntDailyLogin.findOne({
            restraunt_id: req.user._id,
            date: {
                $eq: new Date().toISOString().split('T')[0]
            }
        });
        var resp;
        if (objRestrant) {
            objRestrant.is_active = true;
            objRestrant.updated_by = req.user._id;
            objRestrant.updated_on = new Date().toISOString();
            resp = await objRestrant.save();
        } else {
            restrauntDailyLogin.restraunt_id = req.user._id;
            restrauntDailyLogin.date = new Date().toISOString().split('T')[0];
            restrauntDailyLogin.login_time = new Date().toISOString();
            restrauntDailyLogin.is_active = true;
            restrauntDailyLogin.created_by = req.user._id;
            restrauntDailyLogin.created_on = new Date().toISOString();
            restrauntDailyLogin.updated_by = req.user._id;
            restrauntDailyLogin.updated_on = new Date().toISOString();
            resp = await RestrauntDailyLogin.create(restrauntDailyLogin);
        }

        if (resp) {
            return {
                status: true,
                message: '"Restraunt Login Successfull"',
                data: resp || restrauntDailyLogin
            }
        } else {
            return {
                status: false,
                message: Message.NotSaved,
                data: null
            }
        }
    } catch (error) {
        return {
            status: false,
            message: error
        }
    }
}

export async function UpdateCancelledOrder(orders, req) {
    try {
        if (!orders) {
            return {
                status: false,
                message: Message.InvalidData,
                data: null
            };
        }
        const objRestrauntLog = await RestrauntDailyLogin.findOne({
            restraunt_id: orders.restraunt_id,
            date: {
                $eq: new Date().toISOString().split('T')[0],
            },
        });
        if (!objRestrauntLog) {
            return {
                status: false,
                message: "Restraunt is offline.",
                data: null
            };
        }
        objRestrauntLog.total_cancelled_orders++;
        objRestrauntLog.total_cancelled_orders_value += orders.total_price;
        await objRestrauntLog.save();
        return {
            status: true,
            message: "Order Updated in Restraunt Dashboard",
            data: null
        };
    } catch (error) {
        return {
            status: false,
            message: error,
            data: null
        };
    }
}

export async function UpdateCompletedOrder(orders, req) {
    try {
        if (!orders) {
            return {
                status: false,
                message: Message.InvalidData,
                data: null
            };
        }

        const objRestrauntLog = await RestrauntDailyLogin.findOne({
            restraunt_id: orders.restraunt_id,
            date: {
                $eq: new Date().toISOString().split('T')[0],
            },
        });

        if (!objRestrauntLog) {
            return {
                status: false,
                message: "Restraunt is offline.",
                data: null
            };
        }

        objRestrauntLog.total_completed_order++;
        objRestrauntLog.total_completed_orders_value += orders.total_price;

        await objRestrauntLog.save();

        return {
            status: true,
            message: "Order Updated in Restraunt Dashboard",
            data: null
        };
    } catch (error) {
        return {
            status: false,
            message: error,
            data: null
        };
    }
}

export async function UpdateTotalOrder(orders, req) {
    try {
        if (!orders) {
            return {
                status: false,
                message: Message.InvalidData,
                data: null
            };
        }

        const objRestrauntLog = await RestrauntDailyLogin.findOne({
            restraunt_id: orders.restraunt_id,
            is_active: true,
            date: {
                $eq: new Date().toISOString().split('T')[0],
            },
        });

        if (!objRestrauntLog) {
            return {
                status: false,
                message: "Restraunt is offline.",
                data: null
            };
        }

        objRestrauntLog.total_orders++;
        objRestrauntLog.total_orders_value += orders.total_price;

        await objRestrauntLog.save();

        return {
            status: true,
            message: "Order Updated in Restraunt Dashboard",
            data: null
        };
    } catch (error) {
        return {
            status: false,
            message: error,
            data: null
        };
    }
}