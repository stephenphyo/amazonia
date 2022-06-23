const router = require('express').Router();
const ordersCtrl = require('../controllers/orders.controller');
const isAuth = require('../utils/isAuth');

/* POST */
router.post('/', isAuth, ordersCtrl.postCreateOrder);

/* GET */
router.get('/:id', isAuth, ordersCtrl.getOrder);
router.get('/', isAuth, ordersCtrl.getAllOrders);

module.exports = router;