import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './models/Users.js';
import Provedor from './models/Provedor.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Para criar tokens de autenticação

const app = express();

// Configura o middleware CORS
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200 // Para garantir compatibilidade com alguns navegadores
};


//Aplicaçao do cors configurado
app.use(cors(corsOptions));

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

// Endpoint para cadastro de prestadores de serviço
app.post('/registerprovedors', async (req, res) => {
    try {
        const { 
            name, email, cpf, password, especialidade, telefone, 
            endereco, bairro, cidade, estado, cep, descricaoServicos 
        } = req.body;

        if (!name || !email || !cpf || !password || !especialidade || !telefone || !endereco || !bairro || !cidade || !estado || !cep) {
            return res.status(400).json({ message: 'Dados faltando' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newProvedor = new Provedor({
            name,
            email,
            cpf,
            password: hashedPassword,
            especialidade,
            telefone,
            endereco,
            bairro,
            cidade,
            estado,
            cep,
            descricaoServicos: descricaoServicos || '', // Adicione a descrição ou mantenha vazia
        });

        await newProvedor.save();
        res.status(201).json(newProvedor);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar prestador', error });
    }
});

// Endpoint para listar todos os provedores
app.get('/provedores', async (req, res) => {
    try {
        const provedores = await Provedor.find(); // Busca todos os provedores
        res.status(200).json(provedores); // Retorna a lista de provedores
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar provedores' });
    }
});

app.get('/provedores/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const provedor = await Provedor.findById(id);

        if (!provedor) {
            return res.status(404).json({ message: 'Prestador não encontrado' });
        }

        res.status(200).json(provedor);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar prestador', error });
    }
});




// Conectar ao banco de dados e iniciar servidor
mongoose.connect("mongodb+srv://kaua:25042003@cluster0.mkv18.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((error) => console.log("Erro ao conectar ao MongoDB", error));

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));