import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import ordemRoutes from './routes/ordemServicoRoutes';

// Carrega variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ordens_servico';

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve o frontend

// Conexão com Banco
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Conectado'))
    .catch(err => console.error('Erro no MongoDB:', err));

// Rotas
app.use('/api', ordemRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});