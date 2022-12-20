const express = require('express');
const {
    addSale
} = require('../controllers/saleController')
const router = express.Router();

//create a sale
router.post('/', addSale);




module.exports = router;