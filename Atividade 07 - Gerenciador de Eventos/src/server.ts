import express, { Request, Response } from 'express';
import mongoose, { Schema, Document } from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

// CONFIGURAÇÃO 
const app = express();
const PORT = 3000; 

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

//  CONEXÃO COM MONGODB 
mongoose.connect('mongodb://localhost:27017/evento')
  .then(() => console.log('MongoDB conectado com sucesso'))
  .catch(err => console.error('Erro ao conectar no MongoDB:', err));

// MODELO DE DADOS (MONGOOSE) 
interface IEvento extends Document {
  titulo: string;
  descricao?: string;
  data: Date;
  local: string;
  valor: number;
}

const EventoSchema: Schema = new Schema({
  titulo: { type: String, required: true },
  descricao: { type: String, required: false }, 
  data: { type: Date, required: true },
  local: { type: String, required: true },
  valor: { type: Number, required: true } 
});

const Evento = mongoose.model<IEvento>('Evento', EventoSchema);

// ROTAS (CRUD) 


app.post('/api/eventos', async (req: Request, res: Response) => {
  try {
    const novoEvento = new Evento(req.body);
    const eventoSalvo = await novoEvento.save();
    res.status(201).json(eventoSalvo);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar evento', error });
  }
});


app.get('/api/eventos', async (req: Request, res: Response) => {
    try {
      const titulo = req.query.titulo as string;
      const filtro = titulo ? { titulo: { $regex: titulo, $options: 'i' } } : {};
      
      const eventos = await Evento.find(filtro);
      res.json(eventos);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar eventos', error });
    }
  });


app.put('/api/eventos/:id', async (req: Request, res: Response) => {
  try {
    const eventoAtualizado = await Evento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!eventoAtualizado) return res.status(404).json({ message: 'Evento não encontrado' });
    res.json(eventoAtualizado);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar evento', error });
  }
});

app.delete('/api/eventos/:id', async (req: Request, res: Response) => {
  try {
    const eventoDeletado = await Evento.findByIdAndDelete(req.params.id);
    if (!eventoDeletado) return res.status(404).json({ message: 'Evento não encontrado' });
    res.json({ message: 'Evento excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir evento', error });
  }
});

// Iniciar Servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});