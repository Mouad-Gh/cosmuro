const express = require('express');
const {
    getCollectionsInfo,
    getSeachedCollectionsInfo
} = require('../controllers/collectionController')
const router = express.Router();


router.get('/',getCollectionsInfo);
router.get('/search/',getSeachedCollectionsInfo);



module.exports = router;