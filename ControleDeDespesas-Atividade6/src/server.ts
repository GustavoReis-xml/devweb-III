// Importa as bibliotecas
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import expenseRoutes from './routes/expenseRoutes';

// 1. INICIALIZAÇÃO E VARIÁVEIS
const app = express();
const PORT = 3000;
// Substitua pela sua string de conexão do MongoDB
const MONGO_URI = 'mongodb://localhost:27017/controleDespesasDB'; 


app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));


mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Conectado ao MongoDB com sucesso!');
    // Só inicia o servidor DEPOIS de conectar ao banco
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar ao MongoDB:', err);
  });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
  });
  
  app.use('/api', expenseRoutes);