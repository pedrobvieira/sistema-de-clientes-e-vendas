const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;