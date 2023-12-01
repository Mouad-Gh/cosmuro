const NewSpot = require('../models/NewSpot');


const addNewSpot = async (req, res)=>{

    const { tx, blockNo, contract, token, creator, startPrice, duration, prize } = req.body;
    //console.log(contract)
    try {
        const newSpot = await NewSpot.create({ tx, blockNo, contract, token, creator, startPrice, duration, prize });
        res.status(200).json({ newSpot });
    } catch (error) {
        res.status(400).json({err : error.message});
    }
}

const getNewSpots = async (req, res) => {
    const search = req.query.name || "";
    try {
        const newSpots = await NewSpot.find({tx: {$regex:search, $options: 'i'}}).sort({createdAt: -1}).limit(100);
        res.status(200).json({count:newSpots.length, newSpots});
    } catch (error) {
        res.status(400).json({err : error.message});
    }
}





module.exports = {
    addNewSpot,
    getNewSpots,
}
