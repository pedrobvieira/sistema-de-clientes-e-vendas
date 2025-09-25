const express = require('express');
const router = express.Router();
const {
    addProduct,
    getProductsByClient,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addProduct);
router.get('/:clientId', protect, getProductsByClient);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;