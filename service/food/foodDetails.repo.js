import { FoodDetails } from "../../models/food/foodDetails.model.js";
import KeyGen from "../../utils/key.js";
import Response from "../../utils/response.js";
import { Message } from './../../utils/constant.js'

export default class FoodDetailRepository {
    constructor() {

    }

    async SaveFoodDetails(foodDetails, req) {
        const response = new Response();
        try {
            foodDetails.food_detail_id = KeyGen.GetKey();
            foodDetails.created_by = req.user.user_id;
            foodDetails.updated_by = req.user.user_id;
            const newFoodDetails = new FoodDetails(foodDetails);
            const i = await newFoodDetails.save();
            console.log(i);
            response.resp = true;
            response.respMsg = Message.Saved;
            response.respObj = foodDetails;
            return response;
        } catch (error) {
            console.log(error);
            response.resp = false;
            response.respMsg = Message.NotSaved;
            return response;
        }
    }
}