const asyncHandler = require('express-async-handler');
const Client = require('../models/Client');

// @desc    Obter todos os clientes do usuário
// @route   GET /api/clients
// @access  Private
const getClients = asyncHandler(async (req, res) => {
    const clients = await Client.find({ user: req.user._id });
    res.json(clients);
});

// @desc    Adicionar um novo cliente
// @route   POST /api/clients
// @access  Private
const addClient = asyncHandler(async (req, res) => {
    const { name } = req.body;
    if (!name) {
        res.status(400);
        throw new Error('O nome do cliente é obrigatório');
    }
    const client = new Client({ user: req.user._id, name });
    const createdClient = await client.save();
    res.status(201).json(createdClient);
});

// @desc    Atualizar um cliente
// @route   PUT /api/clients/:id
// @access  Private
const updateClient = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const client = await Client.findById(req.params.id);
    if (client) {
        client.name = name || client.name;
        const updatedClient = await client.save();
        res.json(updatedClient);
    } else {
        res.status(404);
        throw new Error('Cliente não encontrado');
    }
});

// @desc    Deletar um cliente
// @route   DELETE /api/clients/:id
// @access  Private
const deleteClient = asyncHandler(async (req, res) => {
    const client = await Client.findById(req.params.id);
    if (client) {
        await client.deleteOne();
        res.json({ message: 'Cliente removido' });
    } else {
        res.status(404);
        throw new Error('Cliente não encontrado');
    }
});

module.exports = { getClients, addClient, updateClient, deleteClient };