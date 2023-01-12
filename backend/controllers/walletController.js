const Wallet = require('../models/walletModel');
const jwt = require('jsonwebtoken');



//check if the wallet alreasy exist & if it's not create it then
//if the wallet adress already exist then it should send us the image if there is one

//add a wallet
const addWallet = async (req, res)=>{

    const { type,adress,image,whiteListed } = req.body;

    try {
        const wallet = await Wallet.create({type,adress,image,whiteListed});
        res.status(200).json({wallet});
    } catch (error) {
        res.status(400).json({err : error.message});
    }
}
//create token
const createToken = (_id)=>{
    return jwt.sign({_id}, process.env.SECRET, { expiresIn :'3d' });
}

//check & add
const addNotExistedWallet = async (req,res)=>{
    const { type,adress,image,whiteListed } = req.body;
    try {
        
        //check if the wallet already exists
        const exists = await Wallet.findOne({adress});
        if(exists){
            return res.status(200).json({wallet: exists, exist: true, token: createToken(exists._id)});
        }
        //create the wallet
        const wallet = await Wallet.create({type,adress,image,whiteListed});
        res.status(200).json({wallet, exist: false, token: createToken(wallet._id) });


    } catch (error) {
        res.status(400).json({err : error.message});
    }
    
}
//check jwt authentication token & wallet 
const verifyWallet = async (req,res) => {
    const adress = req.params.wallet;
    //console.log(adress,req.query.adress,req.params)
    try {
        //check if the wallet already exists
        const exists = await Wallet.findOne({adress});
        if(!exists){
            //return res.status(401).json({err: 'Wallet is not existed'});
            throw Error('Wallet is not existed');
        }
        //compare the wallet we got from the authorization token (requireAuth middleware) with the wallet from the request user 
        if(!exists._id.equals(req.wallet._id) ){
            throw Error(`wallet Or authentication error `);
        }

        res.status(200).json({wallet: exists, exist: true });


    } catch (error) {
        res.status(400).json({err : error.message});
    }
}
//get all wallets
const getWallets = async(req, res)=>{
    try {
        const wallets = await Wallet.find({}).sort({createdAt: -1});
        res.status(200).json({wallets});
    } catch (error) {
        res.status(400).json({err : error.message});
    }
    
}

module.exports = {
    addNotExistedWallet,
    getWallets,
    verifyWallet
}