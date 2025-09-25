const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/auth');
const clientRoutes = require('./src/routes/clients');
const productRoutes = require('./src/routes/products');
const paymentRoutes = require('./src/routes/payments'); // Adicione esta linha

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payments', paymentRoutes); // Adicione esta linha

app.get('/', (req, res) => {
    res.send('API está rodando...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});