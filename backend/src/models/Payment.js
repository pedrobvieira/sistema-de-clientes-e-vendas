const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Client',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    valor: {
        type: Number,
        required: true,
    },
    dataPagamento: {
        type: Date,
        required: true,
    },
    anotacao: {
        type: String,
    },
}, {
    timestamps: true,
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;