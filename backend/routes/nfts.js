const express = require('express');
const {
    geTradoors,
    getCollectionNfts
} = require('../controllers/nftsController')
const router = express.Router();


router.get('/',geTradoors);
router.get('/:collectionName',getCollectionNfts);



module.exports = router;