import mongoose, { Schema, Document } from 'mongoose';

export interface IOrdemServico extends Document {
    titulo: string;
    descricao: string;
    dataAbertura: Date;
    status: 'aberta' | 'em andamento' | 'concluída';
    prioridade: 'baixa' | 'média' | 'alta';
    responsavel?: string;
    setorSolicitante: string;
    prazoEstimado?: Date;
    valor: number;
}

const OrdemServicoSchema: Schema = new Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    dataAbertura: { type: Date, default: Date.now }, // Gerada automaticamente [cite: 15]
    status: { 
        type: String, 
        required: true, 
        enum: ['aberta', 'em andamento', 'concluída'], // Validação de status [cite: 16]
        default: 'aberta'
    },
    prioridade: { 
        type: String, 
        required: true, 
        enum: ['baixa', 'média', 'alta'] // Validação de prioridade [cite: 17]
    },
    responsavel: { type: String, required: false },
    setorSolicitante: { type: String, required: true },
    prazoEstimado: { type: Date, required: false },
    valor: { type: Number, required: true } // Decimal tratado como Number
});

export default mongoose.model<IOrdemServico>('OrdemServico', OrdemServicoSchema);