const Sale = require('../models/Sale');


const addSale = async (req, res)=>{

    const { contract, chain, nftID, nftImage, amount, seller, buyer } = req.body;
    console.log(contract)
    try {
        const sale = await Sale.create({contract, chain, nftID, nftImage, amount, seller, buyer});
        res.status(200).json({sale});
    } catch (error) {
        res.status(400).json({err : error.message});
    }
}


module.exports = {
    addSale
}