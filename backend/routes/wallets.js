const express = require('express');
const {
    addNotExistedWallet,
    verifyWallet,
    getWallets
} = require('../controllers/walletController')

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();


//add a wallet
router.post('/',addNotExistedWallet);

//get wallets
//router.get('/',getWallets);

//
router.get('/verify/:wallet',requireAuth,verifyWallet); 



module.exports = router;