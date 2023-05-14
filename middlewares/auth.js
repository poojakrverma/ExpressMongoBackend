import { User } from "../models/user.js";
import Jwt  from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({
            succse: false,
            message: "login first"
        })
    }

    const decodeData = Jwt.verify(token, process.env.JWT_SECRET);

    console.log(decodeData);
    req.user = await User.findById(decodeData._id);
    next();
}