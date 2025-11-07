import { Router } from 'express';
import {
  createExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
  getTotalExpenses
} from '../controllers/expenseController';

const router = Router();

// Rota para CRIAR: POST /api/expenses
router.post('/expenses', createExpense);

// Rota para LER: GET /api/expenses
router.get('/expenses', getAllExpenses);

// Rota para ATUALIZAR: PUT /api/expenses/:id
router.put('/expenses/:id', updateExpense);

// Rota para EXCLUIR: DELETE /api/expenses/:id
router.delete('/expenses/:id', deleteExpense);

router.get('/expenses/total', getTotalExpenses);

export default router;