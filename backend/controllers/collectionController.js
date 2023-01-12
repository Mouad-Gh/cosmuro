const CollectionInfo = require('../models/CollectionInfo');



//get all collections
const getCollectionsInfo = async (req,res) => {
    const page = parseInt(req.query.page || "0");
    const PAGE_SIZE = 20;
    try {
        //get the number of documents
        const total = await CollectionInfo.countDocuments({});
        //get documents
        const collections = await CollectionInfo.find({})
                                                .limit(PAGE_SIZE)
                                                .skip(PAGE_SIZE * page);
        res.status(200).json({
            total: Math.ceil(total / PAGE_SIZE),
            collections
        });
    } catch (error) {
        res.status(400).json({err: error.message});
    }
}

//add a name parameter to search by
const getSeachedCollectionsInfo = async (req,res) => {
    const page = parseInt(req.query.page || "0");
    const search = req.query.name || "";
    const PAGE_SIZE = 20;
    
    
    try {
        //get the number of documents
        const total = await CollectionInfo.countDocuments({name: {$regex:search, $options: 'i'}});
        //get documents
        //text is an index {$text:{$search: name}}
        let collections = await CollectionInfo.find({name: {$regex:search, $options: 'i'}})
                                                .limit(PAGE_SIZE)
                                                .skip(PAGE_SIZE * page);
        res.status(200).json({
            hasMore: (total / PAGE_SIZE )-(page+1) >0 ,
            data: collections
        });
    } catch (error) {
        res.status(400).json({err: error.message});
    }
}

//get collection info by symbol 
const getCollectionBySymbol = async(symbol) => {
    return await CollectionInfo.findOne({symbol})
}








module.exports = {
    getCollectionBySymbol,
    getCollectionsInfo,
    getSeachedCollectionsInfo
}