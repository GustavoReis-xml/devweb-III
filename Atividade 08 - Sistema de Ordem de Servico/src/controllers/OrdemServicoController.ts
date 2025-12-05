import { Request, Response } from 'express';
import OrdemServico from '../models/OrdemServico';

export class OrdemServicoController {
    
    // CRIAR
    async create(req: Request, res: Response) {
        try {
            const novaOS = new OrdemServico(req.body);
            await novaOS.save();
            res.status(201).json(novaOS);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao criar OS', error });
        }
    }

    // LER (Com filtros: Título, Status, Prioridade, Setor)
    async getAll(req: Request, res: Response) {
        try {
            const { titulo, status, prioridade, setor } = req.query;
            const filtro: any = {};

            // Pesquisa por título (parcial)
            if (titulo) filtro.titulo = { $regex: titulo as string, $options: 'i' };
            // Filtros exatos
            if (status) filtro.status = status;
            if (prioridade) filtro.prioridade = prioridade;
            if (setor) filtro.setorSolicitante = { $regex: setor as string, $options: 'i' };

            const ordens = await OrdemServico.find(filtro);
            res.json(ordens);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar OS', error });
        }
    }

    // ATUALIZAR
    async update(req: Request, res: Response) {
        try {
            const osAtualizada = await OrdemServico.findByIdAndUpdate(
                req.params.id, 
                req.body, 
                { new: true, runValidators: true }
            );
            if (!osAtualizada) return res.status(404).json({ message: 'OS não encontrada' });
            res.json(osAtualizada);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao atualizar OS', error });
        }
    }

    // EXCLUIR
    async delete(req: Request, res: Response) {
        try {
            const osDeletada = await OrdemServico.findByIdAndDelete(req.params.id);
            if (!osDeletada) return res.status(404).json({ message: 'OS não encontrada' });
            res.json({ message: 'OS excluída com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao excluir OS', error });
        }
    }
}