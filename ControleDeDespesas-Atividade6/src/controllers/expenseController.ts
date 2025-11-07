import { Request, Response } from 'express';
import Expense, { IExpense } from '../models/expense';

export const createExpense = async (req: Request, res: Response) => {
  try {
    const { description, amount, date } = req.body;

    if (!description || !amount) {
      return res.status(400).json({ error: 'Descrição e Valor são obrigatórios.' });
    }
    if (amount <= 0) {
      return res.status(400).json({ error: 'O valor deve ser positivo.' });
    }

    const expenseDate = date ? new Date(date) : new Date();

    const newExpense: IExpense = new Expense({
      description,
      amount,
      date: expenseDate,
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar despesa' });
  }
};

// (Read)
export const getAllExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 }); // Ordena por data
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar despesas' });
  }
};

//(Update)
export const updateExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updatedExpense) {
      return res.status(404).json({ error: 'Despesa não encontrada' });
    }
    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar despesa' });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ error: 'Despesa não encontrada' });
    }
    res.status(200).json({ message: 'Despesa excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir despesa' });
  }
};

export const getTotalExpenses = async (req: Request, res: Response) => {
  try {
    const total = await Expense.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' }
        }
      }
    ]);

    const totalAmount = total.length > 0 ? total[0].totalAmount : 0;
    res.json({ totalAmount });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao calcular o total das despesas' });
  }
};