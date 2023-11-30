const express = require('express');
const {
    addNewSpot,
    getNewSpots
} = require('../controllers/newspotController')
const router = express.Router();

//create a sale
router.post('/', addNewSpot);


router.get('/', getNewSpots);






module.exports = router;