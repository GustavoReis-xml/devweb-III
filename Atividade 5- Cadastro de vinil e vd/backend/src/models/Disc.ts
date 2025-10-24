import { Schema, model } from 'mongoose';

interface IDisc {
  titulo: string;
  artista: string;
  ano: number;
  genero: string;
  formato: 'Vinil' | 'CD'; // Exemplo, pode ser string simples
  preco: number;
}

const discSchema = new Schema<IDisc>({
  titulo: { type: String, required: true },
  artista: { type: String, required: true },
  ano: { type: Number, required: true },
  genero: { type: String, required: true },
  formato: { type: String, required: true },
  preco: { type: Number, required: true },
});

export const Disc = model<IDisc>('Disc', discSchema);