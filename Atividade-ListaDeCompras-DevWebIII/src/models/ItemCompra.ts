import mongoose, { Schema, Document } from 'mongoose';

// Interface para definir os tipos de dados do nosso item
export interface IItemCompra extends Document {
  nome: string;
  valor: number;
}

// Schema que o Mongoose usará para criar o modelo no MongoDB
const ItemCompraSchema: Schema = new Schema({
  nome: { type: String, required: true },
  valor: { type: Number, required: true }
});

// Exporta o modelo, associando-o à coleção 'shoppingitems'
export default mongoose.model<IItemCompra>('ItemCompra', ItemCompraSchema, 'shoppingitems');