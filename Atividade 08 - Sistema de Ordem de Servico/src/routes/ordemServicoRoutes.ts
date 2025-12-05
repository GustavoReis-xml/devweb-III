import { Router } from 'express';
import { OrdemServicoController } from '../controllers/OrdemServicoController';

const router = Router();
const controller = new OrdemServicoController();

// Definindo as rotas CRUD
router.post('/ordens', controller.create);
router.get('/ordens', controller.getAll);
router.put('/ordens/:id', controller.update);
router.delete('/ordens/:id', controller.delete);

export default router;