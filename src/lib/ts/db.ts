import { SECRET_DB_URI } from "$env/static/private"
import mongoose from "mongoose";

let Connected = false;

export default () => {
    if (Connected) return;
    mongoose.set('strictQuery', true);
    mongoose.connect(SECRET_DB_URI).then(() => { console.log("Connected to DataBase") });
    Connected = true;
}  