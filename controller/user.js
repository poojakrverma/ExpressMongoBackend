import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import { SetCookie } from "../utils/feature.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.json({
            succse: true,
            users
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
            succse: true,
            users
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
            message: "deleted"
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

export const register = async (req, res,next) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email: email });

        if (user) {
            return res.status(500).json({
                succse: false,
                message: "user already available with this email id : " + email
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            name: name,
            email: email,
            password: hashPassword
        });

        SetCookie(user, res, "registered successfully", 201);
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
   try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("invalid email or password", 404));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next(new ErrorHandler("invalid email or password", 401));
    }

    console.log("cookie");
    SetCookie(user, res, `Welcome Back, ${user.name}`, 200);
   } catch (error) {
    next(error);
   }
}

export const me = (req, res) => {

    res.status(200).json({
        succse: true,
        user: req.user
    });
}

export const logout = (req, res) => {
    res.status(200).cookie("token", { expires: new Date(Date.now) })
        .json({
            succse: true,
            user: req.user,
        });
}