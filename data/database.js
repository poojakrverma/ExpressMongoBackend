import mongoose from "mongoose";

/**
 * @description ConnectMongoDB is used to make a connection between mongodb and server
 */
export const ConnectMongoDB = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            dbName: "RestrauntDB",
        })
        .then(() => console.log("database connect successfully."))
        .catch((e) => console.log(e));
};

// export const ConnectAreaDB = () => {
//     mongoose
//         .connect(process.env.MONGO_URI, {
//             dbName: "Area",
//         })
//         .then(() => console.log("database connected with Area DB successfully."))
//         .catch((e) => console.log(e));
// }; 