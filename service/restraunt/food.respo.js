import FoodDetails from './../../models/food/foodDetails.model.js';

class FoodDetailRepository {
    async SaveFoodDetails(foodDetails) {
        const newFoodDetails = new FoodDetails(foodDetails);
        await newFoodDetails.save();
        return { success: true, message: 'Food details saved successfully', data: newFoodDetails };
    }

    async UpdateFoodDetails(foodDetails) {
        const updatedFoodDetails = await findByIdAndUpdate(foodDetails._id, foodDetails, { new: true });
        if (!updatedFoodDetails) {
            return { success: false, message: `Food details with id ${foodDetails._id} not found` };
        }
        return { success: true, message: 'Food details updated successfully', data: updatedFoodDetails };
    }

    async DeleteFoodDetails(foodDetailId) {
        const deletedFoodDetails = await findByIdAndDelete(foodDetailId);
        if (!deletedFoodDetails) {
            return { success: false, message: `Food details with id ${foodDetailId} not found` };
        }
        return { success: true, message: 'Food details deleted successfully' };
    }

    async UpdateStatus(status) {
        const { foodDetailId, status: newStatus } = status;
        const updatedFoodDetails = await findByIdAndUpdate(foodDetailId, { status: newStatus }, { new: true });
        if (!updatedFoodDetails) {
            return { success: false, message: `Food details with id ${foodDetailId} not found` };
        }
        return { success: true, message: 'Status updated successfully', data: updatedFoodDetails };
    }

    async GetAllFoodDetails() {
        const foodDetails = await find();
        return { success: true, data: foodDetails };
    }

    async GetFoodDetail(Id) {
        const foodDetail = await findById(Id);
        if (!foodDetail) {
            return { success: false, message: `Food details with id ${Id} not found` };
        }
        return { success: true, data: foodDetail };
    }

    async GetAllFoodDetailsByRestrauntId() {
        // implement logic to get all food details by restaurant id
    }

    async GetAllFoodDetailsByRestrauntIdB2C(restraunt_id) {
        // implement logic to get all food details by restaurant id for business to customer
    }
}

export default FoodDetailRepository;
