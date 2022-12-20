const express = require('express');
const {
    getUsers,
    getUser,
    addUserOrWallet,
    addWallet,
    deleteWallet
} = require('../controllers/userController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();


//get all Users
router.get('/', getUsers);

//get a single user
router.get('/:id',getUser);

//create a user
router.post('/', requireAuth, addUserOrWallet);

//create a wallet
router.post('/:userId/wallet', addWallet);

//delete a wallet
router.delete('/:userId/wallet/:walletId', deleteWallet);






module.exports = router;