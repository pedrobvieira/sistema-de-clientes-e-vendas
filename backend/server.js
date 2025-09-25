const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Rotas e conexão com o banco de dados
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/auth');
const clientRoutes = require('./src/routes/clients');
const productRoutes = require('./src/routes/products');
const paymentRoutes = require('./src/routes/payments');

// Carregar variáveis de ambiente
dotenv.config();

// Conectar ao banco de dados
connectDB();

const app = express();

// --- Configuração de CORS para Produção e Desenvolvimento ---
// O Render está fornecendo o domínio do Vercel na variável CORS_ORIGIN
const allowedOrigins = [
  'http://localhost:3000', // Permite o desenvolvimento local
  process.env.CORS_ORIGIN,  // Permite o domínio do Vercel em produção
];

const corsOptions = {
  origin: (origin, callback) => {
    // Permite se a origem for indefinida (requisição local) ou estiver na lista de permitidos
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido pelo CORS'));
    }
  },
  credentials: true, // Necessário para cookies ou tokens
};
// --- Fim da Configuração de CORS ---


// Middlewares
app.use(express.json());
app.use(cors(corsOptions)); // Aplica a configuração customizada de CORS

// Definir as rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payments', paymentRoutes);

// Rota de teste
app.get('/', (req, res) => {
    res.send('API está rodando...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});