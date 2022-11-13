const express = require('express');
const {
    addNotExistedWallet,
    getWallets
} = require('../controllers/walletController')

const router = express.Router();


//add a wallet
router.post('/',addNotExistedWallet);
//get wallets
router.get('/',getWallets);



module.exports = router;