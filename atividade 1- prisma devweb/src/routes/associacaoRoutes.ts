

import { Router } from 'express';
import {
  associarPessoaCarro,
  listarAssociacoes,
  excluirAssociacao,
} from '../controllers/associacaoController';

const router = Router();

router.post('/associar', associarPessoaCarro); // Endpoint para criar associação
router.get('/associacoes', listarAssociacoes); // Endpoint para listar todas
router.delete('/associar', excluirAssociacao); // Endpoint para deletar via query params

export default router;