import { FoodCategory } from "../../models/food/foodCategory.model.js";
import { FoodDetails } from "../../models/food/foodDetails.model.js";
import KeyGen from "../../utils/key.js";
import { Message } from './../../utils/constant.js'

export async function SaveFoodDetails(foodDetails, req) {
    try {
        if (foodDetails == null) {
            return {
                status: false,
                message: Message.InvalidData
            }
        }

        foodDetails.created_by = req.user._id;
        foodDetails.updated_by = req.user._id;
        const newFoodDetails = new FoodDetails(foodDetails);
        const resp = await newFoodDetails.save();
        if (resp) {
            return {
                status: true,
                message: Message.Saved,
                data: resp
            }
        } else {
            return {
                status: false,
                message: Message.NotSaved
            }
        }
    } catch (error) {
        return {
            status: false,
            message: error
        }
    }
}

export async function UpdateFoodDetails(foodDetails, req) {
    if (foodDetails == null) {
        return {
            status: false,
            message: Message.InvalidData
        }
    }
    console.log(req.user._id);
    foodDetails.updated_by = req.user._id;
    var res = await FoodDetails.findOneAndUpdate(
        { _id: foodDetails._id },
        foodDetails,
        { upsert: true }
    )
    if (res) {
        return {
            status: true,
            message: Message.Updated,
            data: res
        }
    } else {
        return {
            status: false,
            message: Message.NotSaved
        }
    }
}

export async function GetAllFoodDetails(req) {
    var foodDetailsObj = await FoodDetails.find();
    return {
        status: true,
        message: Message.Fethched,
        data: foodDetailsObj
    }
}

export async function GetFoodDetailsById(food_detail_id) {
    try {
        var foodDetailsObj = await FoodDetails.findOne({ _id: food_detail_id })
        if (foodDetailsObj) {
            return {
                status: true,
                message: Message.Fethched,
                data: foodDetailsObj
            }
        } else {
            return {
                status: false,
                message: Message.WrongId
            }
        }
    } catch (error) {
        return {
            status: false,
            message: error
        }
    }
}

export async function UpdateFoodDetailStatus(updateStatus, req) {
    try {
        const FoodDetailObj = await FoodDetails.findOneAndUpdate(
            { _id: updateStatus.Id },
            { is_active: updateStatus.Status }
        );
        if (FoodDetailObj) {
            return {
                status: true,
                message: Message.Updated
            }
        } else {
            return {
                status: false,
                message: Message.NotUpdated
            }
        }
    } catch (error) {
        return {
            status: false,
            message: error
        }
    }
}

export async function GetAllFoodDetailsByRestrauntId(req) {
    try {
        const FoodDetailsList = await FoodDetails.find({ reastraunt_id: req.user._id });
        for (let i = 0; i < FoodDetailsList.length; i++) {
            // const foodCategoryObj = await FoodCategory.findOne({ _id: FoodDetailsList[i].food_category_id });
            // if (foodCategoryObj) {
            //     FoodDetailsList[i].food_category_id = foodCategoryObj.food_category_name;
            // }
        }
        if (FoodDetailsList.length > 0) {
            return {
                status: true,
                message: Message.Fetched,
                data: FoodDetailsList,
            };
        } else {
            return {
                status: false,
                message: Message.NotFetched,
                data: null,
            };
        }
    } catch (error) {
        return {
            status: false,
            message: error
        }
    }
}

export async function GetAllFoodDetailsByRestrauntIdB2C(restraunt_id, req) {
    try {
        const FoodDetailsList = await FoodDetails.find({ reastraunt_id: restraunt_id });
        if (FoodDetailsList) {
            return {
                data: true,
                message: Message.Fethched,
                FoodDetailsList
            }
        } else {
            return {
                data: false,
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