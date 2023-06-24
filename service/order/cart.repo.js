import { Cart } from "../../models/order/cart.model.js";
//import { uuidv4 } from "uuid";
import { Message } from "../../utils/constant.js";
import KeyGen from "../../utils/key.js";


export async function addToCart(cart, req) {
    const response = { status: false, message: '', data: null };
    try {
        var resp;
        if (!cart._id) {
            cart.total_amount = cart.food_details.reduce((total, item) => total + item.price * item.quantity, 0);
            cart.is_active = true;
            cart.created_by = req.user?._id || '';
            cart.created_on = new Date();
            cart.updated_by = req.user?._id || '';
            cart.updated_on = new Date();

            resp = await Cart.create(cart);
        } else {
            const prev_cart_details = await Cart.findOne({ _id: cart._id });

            if (prev_cart_details && prev_cart_details.food_details && prev_cart_details.food_details[0].restraunt_id !== cart.food_details[cart.food_details.length - 1].restraunt_id) {
                const removableItems = cart.food_details.filter(item => item.restraunt_id === prev_cart_details.food_details[0].restraunt_id);
                removableItems.forEach(item => {
                    const index = cart.food_details.indexOf(item);
                    cart.food_details.splice(index, 1);
                });
            }

            cart.total_amount = cart.food_details.reduce((total, item) => total + item.price * item.quantity, 0);
            cart.is_active = true;
            cart.created_by = req.user?._id || '';
            cart.created_on = new Date();
            cart.updated_by = req.user?._id || '';
            cart.updated_on = new Date();

            resp = await Cart.updateOne({ _id: cart._id }, cart);
        }

        response.status = true;
        response.message = 'Cart Added successfully';
        response.data = resp;
        return response;
    } catch (error) {
        response.message = error.message;
        response.data = error.message;
        return response;
    }
}

export async function getCart(session_id, req) {
    const response = { status: false, message: '', data: null };
    try {
        const cart = await Cart.findOne({ _id: session_id });

        if (!cart) {
            response.status = false;
            response.message = error.message;
            response.data = error;
            return response;
        }

        // if (cart.json_food_details) {
        //     cart.food_details = JSON.parse(cart.json_food_details);
        //     cart.json_food_details = '';
        // }

        response.status = true;
        response.message = Message.Fethched;
        return cart;
    } catch (error) {
        response.status = false;
        response.message = error.message;
        response.data = error;
        return response;
    }

}

export async function removeFromCart(session_id, index, req) {
    const response = { status: false, message: '', data: null };
    try {
        const cart = await Cart.findOne({ _id: session_id });

        if (cart) {
            cart.food_details.splice(index, 1);
            cart.total_amount = cart.food_details.reduce((total, item) => total + item.price * item.quantity, 0);
            const resp = await cart.save();
            if (!resp) {
                response.status = true;
                response.message = 'Cart item not removed';
                response.data = cart;
                return response
            }

            response.status = true;
            response.message = 'Cart item removed successfully';
            response.data = cart;
            return response;
        } else {
            response.message = 'Cart details not found';
            return response;
        }
    } catch (error) {
        response.message = error.message;
        return response;
    }
}
export async function getCartDetails(session_id, req) {
    try {
        const cart = await Cart.findOne({ _id: session_id });
        if (!cart) {
            return {
                status: false,
                message: 'Cart details not found',
                data: null,
            };
        }
        return {
            status: true,
            message: 'Cart details fetched successfully',
            data: cart,
        };
    } catch (error) {
        return {
            status: false,
            message: error.message,
            data: null,
        };
    }
}
