import express from "express";
import { createUser, deleteUser, getAllUsers, getUser, login, RefreshToken, logout, me, register } from "../controller/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get('/all', getAllUsers);

router.get('/userid/:id', getUser);

router.delete('/delete/:id', deleteUser);

router.post('/new', createUser);

router.post('/register', register);

router.post('/login', login);

router.get('/refresToken', RefreshToken);

router.get('/logout', logout);

router.get('/me', isAuthenticated, me);


export default router;