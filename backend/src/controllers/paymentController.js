const asyncHandler = require('express-async-handler');
const Payment = require('../models/Payment');
const Client = require('../models/Client');

const addPayment = asyncHandler(async (req, res) => {
    const { clientId, valor, dataPagamento, anotacao } = req.body;
    const client = await Client.findById(clientId);

    if (!client) {
        res.status(404);
        throw new Error('Cliente não encontrado');
    }

    const payment = new Payment({
        client: clientId,
        user: req.user._id,
        valor,
        dataPagamento,
        anotacao,
    });

    const createdPayment = await payment.save();
    res.status(201).json(createdPayment);
});

const getPaymentsByClient = asyncHandler(async (req, res) => {
    const payments = await Payment.find({ client: req.params.clientId, user: req.user._id });
    res.json(payments);
});

module.exports = { addPayment, getPaymentsByClient };