

import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const associarPessoaCarro = async (req: Request, res: Response) => {
  try {
    const { pessoaId, carroId }: { pessoaId: number; carroId: number } = req.body;

    const associacao = await prisma.pessoaPorCarro.create({
      data: {
        pessoaId,
        carroId,
      },
    });

    res.status(201).json(associacao);
  } catch (error: unknown) { // Definimos o tipo do erro como unknown
    if (error && typeof error === 'object' && 'code' in error) {
      const errorCode = (error as { code: string }).code;

      
      if (errorCode === 'P2002') {
        return res.status(409).json({ error: 'Esta associação já existe.' });
      }
      
      if (errorCode === 'P2003') {
        return res.status(404).json({ error: 'Pessoa ou Carro não encontrado.' });
      }
    }
    res.status(500).json({ error: 'Não foi possível criar a associação.' });
  }
};

export const listarAssociacoes = async (req: Request, res: Response) => {
  try {
    const associacoes = await prisma.pessoaPorCarro.findMany({
      include: {
        pessoa: true,
        carro: true,
      },
    });
    res.status(200).json(associacoes);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível listar as associações.' });
  }
};


export const excluirAssociacao = async (req: Request, res: Response) => {
  try {
    const { pessoaId, carroId } = req.query;

    if (!pessoaId || !carroId) {
        return res.status(400).json({ error: 'pessoaId e carroId são obrigatórios.'})
    }

    await prisma.pessoaPorCarro.delete({
      where: {
        pessoaId_carroId: {
          pessoaId: parseInt(pessoaId as string),
          carroId: parseInt(carroId as string),
        },
      },
    });

    res.status(200).json({ message: 'Associação deletada com sucesso.' });
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'code' in error) {
        const errorCode = (error as { code: string }).code;
        if (errorCode === 'P2025') {
            return res.status(404).json({ error: 'Associação não encontrada para deletar.' });
        }
    }
    res.status(500).json({ error: 'Não foi possível deletar a associação.' });
  }
};