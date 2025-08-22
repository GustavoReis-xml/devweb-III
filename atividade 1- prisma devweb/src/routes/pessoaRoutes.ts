import { Router } from 'express';
import {
  createPessoa,
  getAllPessoas,
  getPessoaById,
  updatePessoa,
  deletePessoa,
} from '../controllers/pessoaController';

const router = Router();

router.post('/pessoas', createPessoa);
router.get('/pessoas', getAllPessoas);
router.get('/pessoas/:id', getPessoaById);
router.put('/pessoas/:id', updatePessoa);
router.delete('/pessoas/:id', deletePessoa);

export default router;