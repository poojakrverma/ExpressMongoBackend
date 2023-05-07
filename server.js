import { app } from "./app.js";
import { ConnectMongoDB } from "./data/database.js";


// start the connection of mongodb
ConnectMongoDB();

console.log(process.env.PORT);

app.listen(process.env.PORT, () => {
    console.log(`server is running on port:${process.env.PORT} in ${process.env.NODE_ENV}`);
})