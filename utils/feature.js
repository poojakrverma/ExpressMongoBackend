import Jwt from 'jsonwebtoken';
import { setData, getData } from './redis.js';
// import redis from 'redis'


// const redisClient = redis.createClient('rediss://red-chgkj4m7avjbbjrbeh5g:SCAt6uHZ6ynGhl5h2eQ19UYVPASGwz4w@singapore-redis.render.com:6379');

// redisClient.on('connect', () => {
//     console.log('Connected to Redis');
// });

// redisClient.on('error', (err) => {
//     console.error('Redis error:', err);
// });

const refreshTokens = [];

// const setToken = async (key, value, expiration) => {
//     try {
//         const dd = await redisClient.get("refreshToken");
//         console.log(dd);

//         const result = await redisClient.set(key, value, 'EX', expiration);
//         console.log(result);
//     } catch (error) {
//         console.log(error);
//     }
// };


export const SetCookie = async (user, res, message, statusCode = 200) => {

    const token = Jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    const refreshToken = Jwt.sign({ _id: user._id }, process.env.REFRESH_SECRET);
    // if (redisClient.connect) {
    //     console.log("on");
    //     setToken('refreshToken', refreshToken, 5 * 15 * 60 * 100);
    // } else {
    //     console.log('Redis client is closed');
    // }
    //await setValue('refreshToken', refreshToken, 5 * 15 * 60 * 100);
    // Storing data in Redis
    setData('refreshToken', refreshToken, 5 * 15 * 60 * 100, (result) => {
        console.log('Data stored in Redis:', result);
    });
    getData('refreshToken', (result) => {
        console.log('Data retrieved from Redis:', result);
    });

    refreshTokens.push(refreshToken);

    res.status(statusCode)
        .cookie("token", token, {
            httpOnly: true,
            maxAge: 50 * 15 * 60 * 100,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true
        })
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 50 * 5 * 15 * 60 * 100,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true
        })
        .json({
            succse: true,
            message: message,
        });
}
