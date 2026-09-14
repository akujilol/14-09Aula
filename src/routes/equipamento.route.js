const express = require('express');
const EquipamentoService = require('../services/equipamentoService');

const router = express.Router();
const equipamentoService = new EquipamentoService();

router.get('/', async (req, res) => {
  try {
    const equipamentos = await equipamentoService.listarTodos();
    res.json(equipamentos);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao listar equipamentos' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const equipamento = await equipamentoService.buscarPorId(req.params.id);
    if (!equipamento) {
      return res.status(404).json({ mensagem: 'Equipamento não encontrado' });
    }
    res.json(equipamento);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao buscar equipamento' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nome, tipo, disponivel } = req.body;
    if (!nome) {
      return res.status(400).json({ mensagem: 'Campo "nome" é obrigatório' });
    }
    const novoEquipamento = await equipamentoService.cadastrar({ nome, tipo, disponivel });
    res.status(201).json(novoEquipamento);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao cadastrar equipamento' });
  }
});


router.patch('/:id/disponibilidade', async (req, res) => {
  try {
    const { disponivel } = req.body;
    if (typeof disponivel !== 'boolean') {
      return res.status(400).json({ mensagem: 'Campo "disponivel" deve ser true ou false' });
    }
    const atualizado = await equipamentoService.atualizarDisponibilidade(req.params.id, disponivel);
    if (!atualizado) {
      return res.status(404).json({ mensagem: 'Equipamento não encontrado' });
    }
    res.json(atualizado);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao atualizar disponibilidade' });
  }
});

module.exports = router;