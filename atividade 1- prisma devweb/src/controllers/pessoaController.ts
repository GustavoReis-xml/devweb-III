
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const createPessoa = async (req: Request, res: Response) => {
  try {
    const { nome }: { nome: string } = req.body;
    const pessoa = await prisma.pessoa.create({
      data: { nome },
    });
    res.status(201).json(pessoa);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível criar a pessoa.' });
  }
};


export const getAllPessoas = async (req: Request, res: Response) => {
  try {
    const pessoas = await prisma.pessoa.findMany();
    res.status(200).json(pessoas);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível listar as pessoas.' });
  }
};


export const getPessoaById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pessoa = await prisma.pessoa.findUnique({
      where: { id: parseInt(id) },
    });
    if (!pessoa) {
      return res.status(404).json({ error: 'Pessoa não encontrada.' });
    }
    res.status(200).json(pessoa);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível buscar a pessoa.' });
  }
};


export const updatePessoa = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome }: { nome: string } = req.body;
    const pessoa = await prisma.pessoa.update({
      where: { id: parseInt(id) },
      data: { nome },
    });
    res.status(200).json(pessoa);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível atualizar a pessoa.' });
  }
};


export const deletePessoa = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.pessoa.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Pessoa deletada com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível deletar a pessoa.' });
  }
};