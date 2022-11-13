const jwt = require('jsonwebtoken');
const Wallet = require('../models/walletModel');


const requireAuth = async (req,res, next)=>{

    //verify authentification
    const {authorization } = req.headers;

    if(!authorization){
        return res.status(401).json({err: 'authorization token required'});

    }

    const token = authorization.split(' ')[1];
    try {

        const { _id } = jwt.verify(token, process.env.SECRET);
        req.wallet = await Wallet.findOne({_id}).select('_id');
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({err: 'Request is not authorized'});
    }
}

module.exports = requireAuth ;