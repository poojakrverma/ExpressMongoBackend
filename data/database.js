import mongoose from "mongoose";

/**
 * @function ConnectMongoDB is used to make a connection between mongodb and server
 * @author Purushuttam Kumar
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