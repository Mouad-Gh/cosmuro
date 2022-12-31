const express = require('express');
const {
    addSale,
    getSales
} = require('../controllers/saleController')
const router = express.Router();

//create a sale
router.post('/', addSale);


router.get('/', getSales);




module.exports = router;