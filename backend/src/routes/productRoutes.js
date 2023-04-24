const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', authMiddleware.authenticate, productController.getAllProducts);

// Protected routes (require authentication)
router.post('/addProduct', authMiddleware.authenticate, productController.createProduct);
router.post('/editProduct', authMiddleware.authenticate, productController.editProduct);
router.post('/deleteProduct', authMiddleware.authenticate, productController.deleteProduct);

module.exports = router;
