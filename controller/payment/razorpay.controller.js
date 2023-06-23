import * as _razorPay from "../../service/payment/razorpay.repo.js";


export const GetRazorPayPaymentLink = async (req, res) => {
    try {
        const result = await _razorPay.GetRazorPayPaymentLink(req.body, req);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: error });
    }
}