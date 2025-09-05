import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import compraRotas from './routes/compraRoutes';
import path from 'path';

const app = express();
const PORTA = 3000;

// middlewares
app.use(cors());
app.use(bodyParser.json());

// EXPRESS PARA SERVIR ARQUIVOS DA PASTA 'public'
// path.join(__dirname, '..', 'public') cria o caminho correto para a pasta public
app.use(express.static(path.join(__dirname, '..', 'public')));

// link de conexão com o MongoDB
const MONGO_URI = 'mongodb://localhost:27017/shopping-list';
mongoose.connect(MONGO_URI).then(() => {
    console.log('Conectado ao MongoDB');
}).catch(err => {
    console.error('Erro ao conectar ao MongoDB', err);
});

// Define a rota principal da API
app.use('/api/itens-compra', compraRotas);

// Inicia o servidor
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});