const express = require('express');
const router = express.Router();
const { addPayment, getPaymentsByClient } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addPayment);
router.get('/:clientId', protect, getPaymentsByClient);

module.exports = router;