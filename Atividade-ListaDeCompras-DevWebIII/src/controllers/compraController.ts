import { Request, Response } from 'express';
import ItemCompra from '../models/ItemCompra';

// Função para buscar todos os itens
export const obterItens = async (req: Request, res: Response) => {
    const itens = await ItemCompra.find();
    res.json(itens);
};

// Função para adicionar um novo item
export const adicionarItem = async (req: Request, res: Response) => {
    const novoItem = new ItemCompra(req.body);
    await novoItem.save();
    res.json(novoItem);
};

// Função para atualizar um item existente pelo ID
export const atualizarItem = async (req: Request, res: Response) => {
    const itemAtualizado = await ItemCompra.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(itemAtualizado);
};

// Função para deletar um item pelo ID
export const deletarItem = async (req: Request, res: Response) => {
    await ItemCompra.findByIdAndDelete(req.params.id);
    res.json({ mensagem: 'Item deletado' });
};