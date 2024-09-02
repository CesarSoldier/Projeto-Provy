import mongoose from "mongoose";

async function connectDataBase(){
    await mongoose.connect("mongodb+srv://iurygab:0103igfaria@cluster0.lv0iy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
}

export default connectDataBase