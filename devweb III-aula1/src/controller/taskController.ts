import { PrismaClient } from "@prisma/client";
import { Request , Response } from "express";

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response) => {
    const tasks = await prisma.task.findMany();
    console.log("Tarefas encontradas:", tasks); // debug
    res.json(tasks);
   };
    
   export const createTask = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const task = await prisma.task.create({
      data: { title, description },
    });
    res.status(201).json(task);
   };
    
   export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, done } = req.body;
    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: { title, description, done },
    });
    res.json(task);
   };
    
   export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    await prisma.task.delete({ where: { id: Number(id) } });
    res.status(204).send();
   };