const Sale = require('../models/Sale');


const addSale = async (req, res)=>{

    const { contract, chain, transactionID, nftID, nftImage, CollectionName, collectionImage, amount, buyer } = req.body;
    //console.log(contract)
    try {
        const sale = await Sale.create({contract, chain, transactionID, nftID, nftImage, CollectionName, collectionImage, amount, buyer});
        res.status(200).json({sale});
    } catch (error) {
        res.status(400).json({err : error.message});
    }
}

const getSales = async (req, res) => {
    try {
        const sales = await Sale.find({}).sort({createdAt: -1}).limit(100);
        res.status(200).json(sales);
    } catch (error) {
        res.status(400).json({err : error.message});
    }
}



module.exports = {
    addSale,
    getSales
}