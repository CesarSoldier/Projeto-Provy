import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './models/Users.js';
import bcrypt from 'bcrypt'; // Para hashing de senha
import jwt from 'jsonwebtoken'; // Para criar tokens de autenticação

const app = express();

// Configura o middleware CORS
app.use(cors());
app.use(express.json());

// Endpoint para cadastro de usuários
app.post('/register', async (req, res) => {
    try {
      const { name, email, cpf, password } = req.body;
  
      if (!name || !email || !cpf || !password) {
        return res.status(400).json({ message: 'Dados faltando' });
      }
  
      // Verifica se o e-mail ou CPF já existe
      const existingEmail = await User.findOne({ email });
      const existingCpf = await User.findOne({ cpf });
  
      if (existingEmail) {
        return res.status(400).json({ message: 'E-mail já cadastrado' });
      }
      if (existingCpf) {
        return res.status(400).json({ message: 'CPF já cadastrado' });
      }
  
      // Criptografa a senha
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({ name, email, cpf, password: hashedPassword });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar usuário', error });
    }
  });

// Endpoint para login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error });
  }
});

mongoose.connect("mongodb+srv://kaua:25042003@cluster0.mkv18.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((error) => console.log("Erro ao conectar ao MongoDB", error));

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
