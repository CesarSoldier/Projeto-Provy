import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

const user = [];

app.get("/users", (request, response) => {
    return response.json(users);
});

app.post("/users", (requeste, response) => {
    const { name, age, nickName } = request.body

    users.push({ name, age, nickName });

    return response.json({ name, age, nickName });
});

mongoose.connect("mongodb+srv://iurygab:<0103igfaria>@cluster0.lv0iy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => console.log("Banco de dados conectado")).catch(() => console.log("Desconectado"))
app.listen(3000);
