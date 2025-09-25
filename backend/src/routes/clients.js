const express = require('express');
const router = express.Router();
const {
    getClients,
    addClient,
    updateClient,
    deleteClient
} = require('../controllers/clientController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getClients);
router.post('/', protect, addClient);
router.put('/:id', protect, updateClient);
router.delete('/:id', protect, deleteClient);

module.exports = router;