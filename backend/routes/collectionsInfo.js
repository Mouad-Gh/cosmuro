const express = require('express');
const {
    getCollectionsInfo
} = require('../controllers/collectionController')
const router = express.Router();


router.get('/',getCollectionsInfo);



module.exports = router;