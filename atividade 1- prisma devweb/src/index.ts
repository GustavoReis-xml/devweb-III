
import express, { Request, Response } from 'express';
import cors from 'cors'; //IMPORTAR O CORS
import carroRoutes from './routes/carroRoutes';
import pessoaRoutes from './routes/pessoaRoutes';
import associacaoRoutes from './routes/associacaoRoutes';

const app = express();
const PORT = 3000;

app.use(cors()); //USAR O CORS
app.use(express.json());
app.use(express.static('public')); // SERVIR ARQUIVOS DA PASTA public

app.use('/api', carroRoutes);
app.use('/api', pessoaRoutes);
app.use('/api', associacaoRoutes);


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});