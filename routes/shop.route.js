const express = require('express');
const shopController = require('../controllers/shop.controller');

const router = express.Router();

router.get('/', shopController.renderHome);

router.get('/cart', shopController.renderCart);
router.post('/cart/:id', shopController.addToCart);

router.post('/cart/delete/:id', shopController.deleteFromtCart);

module.exports = router;
