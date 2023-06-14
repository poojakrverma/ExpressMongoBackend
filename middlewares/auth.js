import { User } from "../models/user.js";
import Jwt from "jsonwebtoken";
import redis from 'redis'


const client = redis.createClient(process.env.EXTERNAL_REDISH_URL);


// Authenticate the user
export const isAuthenticated = async (req, res, next) => {

    const { token } = req.cookies;
    // check json web token exists or not
    if (!token) {
        return res.status(401).json({
            succse: false,
            message: "login first"
        })
    }

    Jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
            console.log(err);
            return res.status(403).json({
                succse: false,
                message: "Access token is invalid"
            })
        }
        else {
            // console.log(decodedToken);
            req.user = await User.findById(decodedToken._id);
            next();
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
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};
