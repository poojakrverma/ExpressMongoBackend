import { User } from "../models/user.js";
import Jwt from "jsonwebtoken";


/**
 * @description This method is used to authenticate the user
 * and store the user details in the request.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @author Purushuttam Kumar
 */
export const isAuthenticated = async (req, res, next) => {

    const { token } = req.cookies;
    // check json web token exists or not
    if (!token) {
        return res.status(401).json({
            succse: false,
            message: 'login first'
        })
    }

    Jwt.verify(token.toString(), process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
            console.log(err);
            return res.status(403).json({
                succse: false,
                message: 'Access token is invalid'
            })
        }
        else {
            // console.log(decodedToken);
            const user = await User.findById(decodedToken._id);
            if (user) {
                // store the user details in request.
                req.user = user;
                next();
            } else {
                return res.status(401).json({
                    success: false,
                    message: 'User not found or invalid user id'
                })
            }
        }
    })
}

// This middleware function checks if the request has a valid JWT in Header
export const HeaderAuthenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Missing authentication token' });
    }

    try {
        // Verify the JWT and decode the user's information
        const decoded = Jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id);
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid authentication token' });
    }
}

// check current user
export const checkUser = async (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        Jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                console.log(user);
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};
