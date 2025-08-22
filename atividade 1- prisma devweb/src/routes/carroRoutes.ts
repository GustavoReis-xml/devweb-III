
import { Router } from 'express';
import {
  createCarro,
  getAllCarros,
  getCarroById,
  updateCarro,
  deleteCarro,
} from '../controllers/carroController';

const router = Router();

router.post('/carros', createCarro);
router.get('/carros', getAllCarros);
router.get('/carros/:id', getCarroById);
router.put('/carros/:id', updateCarro);
router.delete('/carros/:id', deleteCarro);

export default router;