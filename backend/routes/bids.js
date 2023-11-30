const express = require('express');
const {
    addBid,
    getBids
} = require('../controllers/bidController')
const router = express.Router();

//create a sale
router.post('/', addBid);


router.get('/', getBids);






module.exports = router;