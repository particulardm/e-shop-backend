const express = require('express');
const router = express.Router();
const { getItems, addToCart, getCart } = require('../controllers/guestController');

router.route('/')
    .get(getItems);

router.put('/:id', addToCart);

router.route('/cart')
    .get(getCart)

module.exports = router;