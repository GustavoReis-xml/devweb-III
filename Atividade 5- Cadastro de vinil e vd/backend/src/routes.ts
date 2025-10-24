import { Router } from 'express';
import { Disc } from './models/Disc';

const router = Router();

// CREATE (Cadastrar) 
router.post('/discs', async (req, res) => {
  try {
    const newDisc = await Disc.create(req.body);
    res.status(201).json(newDisc);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// READ (Listar todos) 
router.get('/discs', async (req, res) => {
  try {
    const discs = await Disc.find();
    res.json(discs);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// READ (Listar um - necessário para editar)
router.get('/discs/:id', async (req, res) => {
  try {
    const disc = await Disc.findById(req.params.id);
    res.json(disc);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// UPDATE (Editar) 
router.put('/discs/:id', async (req, res) => {
  try {
    const updatedDisc = await Disc.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedDisc);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// DELETE (Excluir) 
router.delete('/discs/:id', async (req, res) => {
  try {
    await Disc.findByIdAndDelete(req.params.id);
    res.status(204).send(); // Sem conteúdo
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;