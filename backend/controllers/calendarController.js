const CalendarNft = require('../models/CalendarNft');

//create calendar nft
const addCalendar = async (req, res)=>{
    
    const {collectionName, collectionSize, collectionImage, mintPrice, mintDate, chain, mintToken, discordLink, twitterLink, websiteLink } = req.body;
    //console.log(req.body)
    try {
        const calendar = await CalendarNft.create({ collectionName, collectionSize, collectionImage, wallet: req.wallet, mintPrice, mintDate, chain, mintToken, discordLink, twitterLink, websiteLink });
        res.status(200).json(calendar);
    } catch (error) {
        res.status(400).json({err : error.message});
    }
}

//get all calendars
const getCalendars = async(req, res)=>{
    const page = parseInt(req.query.page || "0");
    const search = req.query.name || "";
    const chain = req.query.chain || "all";
    const upComing = req.query.upcoming ;
    const PAGE_SIZE = 20;
    try {

        const filterObj = {
            collectionName: {$regex:search, $options: 'i'}, 
            ...( upComing ? { mintDate: { $gte: new Date()} } : { mintDate: { $lte: new Date()} } ), 
            ...(chain!=="all" && { chain })
        }
        const calendars = await CalendarNft.find(filterObj).populate("wallet").sort({ ...( upComing ? {mintDate: 1} : {mintDate: -1}) }).limit(PAGE_SIZE);
        res.status(200).json(calendars);
    } catch (error) {
        res.status(400).json({err : error.message});
    }
    
}

module.exports = {
    addCalendar,
    getCalendars
}