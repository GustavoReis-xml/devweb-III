import express from 'express';
import cors from 'cors';
import { connectDB } from './database';
import routes from './routes';

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar ao DB
connectDB();

// Rotas da API
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});