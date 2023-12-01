const Bid = require('../models/Bid');


const addBid = async (req, res)=>{

    const { tx, blockNo, contract, token, bidder, bidPrice, bidTime } = req.body;
    //console.log(contract)
    try {
        const bid = await Bid.create({ tx, blockNo, contract, token, bidder, bidPrice, bidTime });
        res.status(200).json({ bid });
    } catch (error) {
        res.status(400).json({err : error.message});
    }
}

const getBids = async (req, res) => {
    const search = req.query.name || "";
    try {
        const bids = await Bid.find({tx: {$regex:search, $options: 'i'}}).sort({createdAt: -1}).limit(100);
        res.status(200).json({count:bids.length, bids});
    } catch (error) {
        res.status(400).json({err : error.message});
    }
}





module.exports = {
    addBid,
    getBids,
}
