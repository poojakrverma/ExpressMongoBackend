import express from 'express'
import networkRouter from './routes/network/network.router.js'
import userRouter from './routes/user.js'
import areaRouter from './routes/comman/area.js'
import foodCategoryRouter from './routes/food/foodCategory.router.js'
import foodDetailsRouter from './routes/food/foodDetails.router.js'
import { config } from 'dotenv'
// import swaggerJSDoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
// import options from './utils/swagger.js';
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

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// app.get('*', checkUser); // apply in every routes
app.use("/api/v1/connection", networkRouter)
app.use("/api/v1/user", userRouter);
app.use("/api/v1/Area", areaRouter);
app.use("/api/v1/FoodCategory", foodCategoryRouter)
app.use("/api/v1/FoodDetails", foodDetailsRouter)

app.get('/', (req, res) => {
  res.send("nice working")
});

// using error middleware
app.use(errorMiddleware);

// const specs = swaggerJSDoc(options);

// app.use(
//     "/api-docs",
//     swaggerUi.serve,
//     swaggerUi.setup(specs)
// )