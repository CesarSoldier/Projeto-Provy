import express from 'express';
import QRCode from 'qrcode';
import mongoose from 'mongoose';
import cors from 'cors';
import User from './models/Users.js';
import Provedor from './models/Provedor.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Para criar tokens de autenticação
import Pagamento from './models/Pagamento.js'
import { gerarCodigoPix } from './function/pixUtils.js';


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
// Rota de login
// Rota de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar se o usuário existe no modelo User (clientes) ou Provedor (prestadores)
    let user = await User.findOne({ email });
    if (!user) {
      user = await Provedor.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado.' });
    }

    // Validar a senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Senha incorreta.' });
    }

    // Gerar um token com informações do usuário
    const token = jwt.sign(
      { userId: user._id, tipoUsuario: user instanceof User ? 'cliente' : 'prestador' },
      'secrect_key',  // Chave secreta para assinatura do token
      { expiresIn: '1h' }  // Define a expiração do token (1 hora)
    );

    res.json({ token, tipoUsuario: user instanceof User ? 'cliente' : 'prestador' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

// Endpoint para cadastro de prestadores de serviço
app.post('/registerprovedors', async (req, res) => {
    try {
        console.log("Dados recebidos:", req.body); // Log para verificar os dados recebidos

        const { name, email, cpf, password, especialidade, telefone, endereco, bairro, cidade, estado, cep } = req.body;

        if (!name || !email || !cpf || !password || !especialidade || !telefone || !endereco || !bairro || !cidade || !estado || !cep) {
            return res.status(400).json({ message: 'Dados faltando' });
        }

        // Verifica se o e-mail ou CPF já existe
        const existingEmail = await Provedor.findOne({ email });
        const existingCpf = await Provedor.findOne({ cpf });

        if (existingEmail) {
            return res.status(400).json({ message: 'E-mail já cadastrado' });
        }
        if (existingCpf) {
            return res.status(400).json({ message: 'CPF já cadastrado' });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criação do novo provedor
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
        });

        // Verifique os dados antes de salvar
        console.log("Novo Provedor a ser salvo:", newProvedor);

        // Salvando no banco
        await newProvedor.save();
        res.status(201).json(newProvedor);
    } catch (error) {
        console.error("Erro ao criar prestador:", error);
        res.status(500).json({ message: 'Erro ao criar usuário', error });
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


// Chave Pix (substitua pela sua chave Pix real)
const chavePix = '99977502-5101-49dd-a15f-1b6ebffa566d'; // Exemplo de chave Pix

// Chave da API Asaas
const ASAAS_API_KEY = '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDA1MTI0OTU6OiRhYWNoX2I0Nzc3ZmVjLTBiZTItNDA0Ny04M2Y1LTc4MDA0N2ZkODdlZg=='; // Substitua pela sua chave de API do Asaas
const ASAAS_API_URL = 'https://www.asaas.com/api/v3';

// ** Gerar Pagamento com PIX **
app.post('/gerar-pix', async (req, res) => {
  const { clienteId, valor, descricao } = req.body;

  try {
    // Criando a cobrança via API Asaas
    const response = await axios.post(
      `${ASAAS_API_URL}/payments`,
      {
        customer: clienteId, // ID do cliente no Asaas
        billingType: "PIX",
        dueDate: new Date().toISOString().split('T')[0], // Data de vencimento no formato YYYY-MM-DD
        value: valor,
        description: descricao,
        externalReference: `Cliente-${clienteId}`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          access_token: ASAAS_API_KEY
        }
      }
    );

    const { invoiceUrl, id } = response.data;

    // Salvar o pagamento no banco
    const novoPagamento = new Pagamento({ cliente_id: clienteId, valor, codigo_pix: id });
    await novoPagamento.save();

    // Retorna o QR Code e a URL para o frontend
    res.json({ qrCode: invoiceUrl, idPagamento: id });
  } catch (error) {
    console.error('Erro ao criar pagamento PIX:', error.response?.data || error.message);
    res.status(500).json({ erro: 'Erro ao criar pagamento PIX.', detalhes: error.response?.data });
  }
});

// ** Listar pagamentos do banco (MongoDB) **
app.get('/listar-pagamentos', async (req, res) => {
  try {
    const pagamentos = await Pagamento.find();
    res.json(pagamentos);
  } catch (error) {
    console.error("Erro ao listar pagamentos:", error);
    res.status(500).json({ erro: "Erro ao listar os pagamentos." });
  }
});

// ** Atualizar status do pagamento **
app.post('/atualizar-status', async (req, res) => {
  const { idPagamento } = req.body;

  try {
    // Consultando o pagamento na API Asaas
    const response = await axios.get(`${ASAAS_API_URL}/payments/${idPagamento}`, {
      headers: {
        access_token: ASAAS_API_KEY
      }
    });

    const status = response.data.status; // Status do pagamento no Asaas

    if (status === 'CONFIRMED') {
      // Atualiza o status no banco MongoDB
      const pagamento = await Pagamento.findOne({ codigo_pix: idPagamento });
      if (pagamento) {
        pagamento.status = "confirmado";
        await pagamento.save();
        return res.json({ mensagem: "Status atualizado com sucesso!", pagamento });
      } else {
        return res.status(404).json({ erro: "Pagamento não encontrado no banco." });
      }
    } else {
      res.json({ mensagem: "Pagamento ainda não confirmado.", status });
    }
  } catch (error) {
    console.error("Erro ao atualizar status do pagamento:", error.response?.data || error.message);
    res.status(500).json({ erro: "Erro ao atualizar status do pagamento." });
  }
});


// Conectar ao banco de dados e iniciar servidor
mongoose.connect("mongodb+srv://kaua:25042003@cluster0.mkv18.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((error) => console.log("Erro ao conectar ao MongoDB", error));

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));