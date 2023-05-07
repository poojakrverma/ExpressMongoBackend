import mongoose from "mongoose";


export const ConnectMongoDB = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            dbName: "backend",
        })
        .then(() => console.log("database connect successfully."))
        .catch((e) => console.log(e));
}; 