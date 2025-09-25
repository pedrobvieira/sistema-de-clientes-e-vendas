const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Client',
    },
    name: {
        type: String,
        required: true,
    },
    unidade: {
        type: String,
    },
    precoCusto: { // Novo campo
        type: Number,
        required: true,
    },
    valorVendido: { // Novo campo
        type: Number,
        required: true,
    },
    dataVenda: {
        type: Date,
        required: true,
    },
    anotacao: {
        type: String,
    },
    valorPago: {
        type: Number,
        default: 0,
    },
    dataPagamento: {
        type: Date,
    },
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;