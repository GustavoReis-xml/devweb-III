import { Router } from 'express';
import { obterItens, adicionarItem, atualizarItem, deletarItem } from '../controllers/compraController';

const roteador = Router();

// Cada rota corresponde a uma operação do CRUD
roteador.get('/', obterItens);       // Ler todos os itens
roteador.post('/', adicionarItem);    // Criar um novo item
roteador.put('/:id', atualizarItem);  // Atualizar um item
roteador.delete('/:id', deletarItem); // Deletar um item

export default roteador;