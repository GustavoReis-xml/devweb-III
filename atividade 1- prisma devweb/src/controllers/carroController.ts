
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const createCarro = async (req: Request, res: Response) => {
  try {
    const { modelo }: { modelo: string } = req.body;
    const carro = await prisma.carro.create({
      data: { modelo },
    });
    res.status(201).json(carro);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível criar o carro.' });
  }
};


export const getAllCarros = async (req: Request, res: Response) => {
  try {
    const carros = await prisma.carro.findMany();
    res.status(200).json(carros);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível listar os carros.' });
  }
};


export const getCarroById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const carro = await prisma.carro.findUnique({
      where: { id: parseInt(id) },
    });
    if (!carro) {
      return res.status(404).json({ error: 'Carro não encontrado.' });
    }
    res.status(200).json(carro);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível buscar o carro.' });
  }
};


export const updateCarro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { modelo }: { modelo: string } = req.body;
    const carro = await prisma.carro.update({
      where: { id: parseInt(id) },
      data: { modelo },
    });
    res.status(200).json(carro);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível atualizar o carro.' });
  }
};


export const deleteCarro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.carro.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Carro deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível deletar o carro.' });
  }
};