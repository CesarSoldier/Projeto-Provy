// routes/auth.js
import express from 'express';
import Cliente from './models/Cliente.js';

const router = express.Router();

router.post('/cadastrocliente', async (req, res) => {
  try {
    const { name, email, cpf, password } = req.body;

    // Verifica se o email ou CPF já está cadastrado
    const existingCliente = await Cliente.findOne({ $or: [{ email }, { cpf }] });
    if (existingCliente) {
      return res.status(400).json({ message: 'Email ou CPF já cadastrado' });
    }

    const cliente = new Cliente({ name, email, cpf, password });
    await cliente.save();

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar usuário', error });
  }
});

export default router;
