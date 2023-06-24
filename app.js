import express from 'express'
import networkRouter from './routes/network/network.router.js'
import userRouter from './routes/user.js'
import areaRouter from './routes/comman/area.js'
import foodCategoryRouter from './routes/food/foodCategory.router.js'
import foodDetailsRouter from './routes/food/foodDetails.router.js'
import restrauntDailyloginRouter from './routes/restraunt/restrauntDailyLogin.router.js'
import orderRouter from './routes/order/order.router.js'
import cartRouter from './routes/order/cart.router.js'
import orderCancellationRouter from './routes/order/orderCancellation.router.js'
import razorPayRouter from './routes/payment/razorpay.router.js'
import emailRouter from './routes/comman/email.router.js'
import otpRouter from './routes/comman/otp.router.js'
import restrauntRouter from './routes/restraunt/reatraunt.router.js'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.js';
import cors from 'cors';

import { checkUser } from './middlewares/auth.js'

export const app = express();
app.enable('trust proxy');
config({
  path: "./data/config.env"
})

// using json middleware
app.use(express.json())
app.use(cookieParser());
app.use(cors());

app.get('*', checkUser); // apply in every routes
app.use("/api/v1/connection", networkRouter)
app.use("/api/v1/user", userRouter);
app.use("/api/v1/Area", areaRouter);
app.use("/api/v1/FoodCategory", foodCategoryRouter);
app.use("/api/v1/FoodDetails", foodDetailsRouter);
app.use("/api/v1/RestrauntDailyLogin", restrauntDailyloginRouter);
app.use("/api/v1/Orders", orderRouter);
app.use("/api/v1/Cart", cartRouter);
app.use("/api/v1/OrderCancellation", orderCancellationRouter);
app.use("/api/v1/RazorPay", razorPayRouter);
app.use("/api/v1/Email", emailRouter);
app.use("/api/v1/Otp", otpRouter);
app.use("/api/v1/RestrauntMaster", restrauntRouter)

app.get('/', (req, res) => {
  res.send("nice working")
});

// using error middleware
app.use(errorMiddleware);