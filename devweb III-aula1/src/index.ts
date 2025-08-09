//importa o framework Express, usado para gerenciar o servidor http 
import express from "express";
import dotenv from "dotenv";
import { taskRoutes } from "./routes/taskRoutes"

dotenv.config();
const app = express();
app.use(express.json())

app.get("/", (req,res) => {
    res.send("API esta rodando! Acesse /task para usar.");
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000: http://localhost:3000");
})