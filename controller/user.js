import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import { SetCookie } from "../utils/feature.js";
import ErrorHandler from "../middlewares/error.js";
import KeyGen from "../utils/key.js";
import Jwt from 'jsonwebtoken';
import { UserType } from "../utils/constant.js";
import * as restraunt from "../service/restraunt/restraunt.repo.js";
import { RestrauntMaster } from "../models/restraunt/restraunt.model.js";


export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.json({
            succse: true,
            data: users
        })
    } catch (error) {
        next(error)
    }
};

export const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log(id);
        const users = await User.findById(id);
        res.json({
            success: true,
            data: users
        })
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log(id);
        await User.findByIdAndDelete(id);
        res.json({
            succse: true,
            message: "user deleted successfully"
        })
    } catch (error) {
        next(error);
    }
};

export const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        await User.create({
            name: name,
            email: email,
            password: password,
        });

        res.status(201).json({
            succse: true,
            message: "registered successfully",
        })
    } catch (error) {
        next(error);
    }
};

export const register = async (req, res, next) => {
    try {
        debugger
        const { role_id, name, email, password } = req.body;

        let user = await User.findOne({ role_id: role_id, email: email });

        if (user) {
            return res.status(500).json({
                success: false,
                message: "user already available with this email id : " + email
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            role_id: role_id,
            name: name,
            email: email,
            password: hashPassword,
            is_active: true,
            jwt_id: null,
            jwt_token: null,
            refresh_token: null,
            refresh_token_expire_at: null
        });
        if (!user) {
            return res.status(500).json({
                success: false,
                message: 'something went wrong'
            });
        }
        req.user = user;
        console.log(user);
        if (role_id == UserType.Restraunt) {
            var restrantMaster = new RestrauntMaster();
            restrantMaster.is_active = true;
            restrantMaster.created_by = user._id.toString();
            restrantMaster.created_on = new Date().toISOString();
            restrantMaster.updated_by = user._id.toString();
            restrantMaster.updated_on = new Date().toISOString();
            //const res = await restraunt.SaveRestrauntMaster(restrantMaster, req);
        }

        SetCookie(user, res, "registered successfully", 201);
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {

        const { role_id, email, password } = req.body;
        const user = await User.findOne({ email, role_id }).select("+password");
        if (!user) {
            return next(new ErrorHandler("invalid email or password", 404));
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(new ErrorHandler("invalid email or password", 401));
        }

        console.log("cookie");
        await SetCookie(user, res, `Welcome Back, ${user.name}`, 200);
    } catch (error) {
        next(error);
    }
}

export const RefreshToken = async (req, res, next) => {
    // const { refreshToken } = req.body;
    const cookies = req.cookies;
    console.log(cookies);
    if (!cookies) {
        return next(new ErrorHandler("Refresh token is required", 401));
    }
    // if (!cookies.includes(refreshToken)) {
    //     return next(new ErrorHandler("Refresh token is invalid", 403));
    // }

    Jwt.verify(cookies.refreshToken, process.env.REFRESH_SECRET, async (err, decoded) => {
        if (err) {
            return next(new ErrorHandler("Refresh token is invalid", 403));
        }

        const user = await User.findById(decoded._id);
        if (!user) {
            return next(new ErrorHandler("Refresh token is invalid", 403));
        }

        await SetCookie(user, res, `Refresh token added.`, 200);;
    });
}

export const me = (req, res) => {

    res.status(200).json({
        succse: true,
        user: req.user
    });
}

export const logout = (req, res) => {
    res.status(200)
        .cookie("token", { expires: new Date(Date.now) })
        .cookie("refreshToken", { expires: new Date(Date.now) })
        .json({
            success: true,
            user: req.user,
        });
}