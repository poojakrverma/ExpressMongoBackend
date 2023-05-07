import express from 'express'
import userRouter from './routes/user.js'
import { config } from 'dotenv'
// import swaggerJSDoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
// import options from './utils/swagger.js';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.js';
import cors from 'cors';

export const app = express();

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

app.use("/user", userRouter);

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