const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const Client = require('../models/Client');

// @desc    Adicionar um novo produto a um cliente
// @route   POST /api/products
// @access  Private
const addProduct = asyncHandler(async (req, res) => {
    const { clientId, name, unidade, precoCusto, valorVendido, dataVenda, anotacao } = req.body;

    const client = await Client.findById(clientId);

    if (!client) {
        res.status(404);
        throw new Error('Cliente não encontrado');
    }

    const product = new Product({
        client: clientId,
        name,
        unidade,
        precoCusto, // Adicionado
        valorVendido, // Adicionado
        dataVenda,
        anotacao,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc    Obter todos os produtos de um cliente
// @route   GET /api/products/:clientId
// @access  Private
const getProductsByClient = asyncHandler(async (req, res) => {
    const products = await Product.find({ client: req.params.clientId });
    res.json(products);
});

// @desc    Atualizar um produto
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = asyncHandler(async (req, res) => {
    const { name, unidade, precoCusto, valorVendido, dataVenda, anotacao, valorPago, dataPagamento } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.unidade = unidade || product.unidade;
        product.precoCusto = precoCusto || product.precoCusto; // Adicionado
        product.valorVendido = valorVendido || product.valorVendido; // Adicionado
        product.dataVenda = dataVenda || product.dataVenda;
        product.anotacao = anotacao || product.anotacao;
        if (valorPago !== undefined) {
            product.valorPago = valorPago;
        }
        if (dataPagamento) {
            product.dataPagamento = dataPagamento;
        }

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Produto não encontrado');
    }
});

// @desc    Deletar um produto
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.deleteOne();
        res.json({ message: 'Produto removido' });
    } else {
        res.status(404);
        throw new Error('Produto não encontrado');
    }
});

module.exports = { addProduct, getProductsByClient, updateProduct, deleteProduct };