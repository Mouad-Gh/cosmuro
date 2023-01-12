const express = require('express');
const {
    addSale,
    getSales,
    topSales,
    getSeachedSales
} = require('../controllers/saleController')
const router = express.Router();

//create a sale
router.post('/', addSale);


router.get('/', getSales);


router.get('/top5', topSales);


router.get('/search', getSeachedSales);




module.exports = router;