import Jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import KeyGen from './key.js';

const refreshTokens = [];

/*
Set the cookie in Browser
*/
export const SetCookie = async (user, res, message, statusCode = 200) => {
    const currentTime = new Date();
    var jwt_id = KeyGen.GetKey();
    var refresh_token_expire_at = currentTime.getTime() + 3 * 60 * 60 * 1000;
    var jwt_token_expire_at = currentTime.getTime() + 1 * 60 * 60 * 1000
    const token = Jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        {
            jwtid: jwt_id,
            expiresIn: jwt_token_expire_at
        }
    );

    const refreshToken = Jwt.sign({ _id: user._id }, process.env.REFRESH_SECRET, { expiresIn: refresh_token_expire_at });
    user.jwt_token = token;
    user.jwt_id = jwt_id;
    user.refresh_token = refreshToken;
    user.refresh_token_expire_at = refresh_token_expire_at;
    await User.findByIdAndUpdate(user._id, user)
    res.status(statusCode)
        .cookie("token", token, {
            httpOnly: true,
            maxAge: 1 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true
        })
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 3 * 60 * 60 * 1000,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true
        })
        .json({
            succse: true,
            message: message,
        });
}
