import { FoodDetails } from "../../models/food/foodDetails.model.js";
import KeyGen from "../../utils/key.js";
import { Message } from './../../utils/constant.js'

export default class FoodDetailRepository {
    constructor() {

    }

    async SaveFoodDetails(foodDetails, req) {
        try {
            if (foodDetails == null) {
                return {
                    status: false,
                    message: Message.InvalidData
                }
            }

            foodDetails.food_detail_id = KeyGen.GetKey();
            foodDetails.created_by = req.user.user_id;
            foodDetails.updated_by = req.user.user_id;
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
                message: Message.NotSaved
            }
        }
    }

    async UpdateFoodDetails(foodDetails, req) {
        if (foodDetails == null) {
            return {
                status: false,
                message: Message.InvalidData
            }
        }
        console.log(req.user_id);
        foodDetails.updated_by = req.user_id;
        var res = await FoodDetails.findOneAndUpdate(
            { food_detail_id: foodDetails.food_detail_id },
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

    async GetAllFoodDetails(req) {
        var foodDetailsObj = await FoodDetails.find();
        return {
            status: true,
            message: Message.Fethched,
            data: foodDetailsObj
        }
    }

    async GetFoodDetailsById(food_detail_id) {
        try {
            var foodDetailsObj = await FoodDetails.findOne({ food_detail_id: food_detail_id })
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
}