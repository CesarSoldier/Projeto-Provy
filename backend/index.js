import express from "express";
import mongoose from "mongoose";

import User from './models/Users.js'

const app = express();

app.use(express.json());

const user = [];

app.get("/users", (request, response) => {
    return response.json(users);
});

app.post("/users", async(request, response) => {
    const user = request.body

    const newUser = await User.create(user)

    return response.json(newUser);
});

mongoose.connect("mongodb+srv://iurygab:0103igfaria@cluster0.lv0iy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => console.log("Conectado")).catch(() => console.log("Desconectado"))
app.listen(3000);