const router = require('express').Router();
const productsCtrl = require('../controllers/products.controller');


/* GET */
router.get('/', productsCtrl.getProducts);
router.get('/id/:id', productsCtrl.getEachProductById);

/* POST */
router.post('/new', productsCtrl.createProduct);

module.exports = router;