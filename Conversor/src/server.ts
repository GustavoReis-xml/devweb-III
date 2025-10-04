import express, { Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
import path from "path";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "../views")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

app.get("/convert", async (req: Request, res: Response) => {
  const { amount, from, to } = req.query;

  if (!amount || !from || !to) {
    return res.status(400).json({ error: "Parâmetros inválidos" });
  }

  try {
    const apiKey = process.env.API_KEY;
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`;
    const response = await axios.get(url);
    const converted = response.data.conversion_result;

    res.json({ result: `${amount} ${from} = ${converted.toFixed(2)} ${to}` });
  } catch (error) {
    res.status(500).json({ error: "Erro ao converter moeda." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});