const router = require('express').Router();
const cartsCtrl = require('../controllers/carts.controller.js');

/* GET */
router.get('/', cartsCtrl.getCartItems);

/* POST */
router.post('/', cartsCtrl.updateCartItems);

module.exports = router;