const mongoose = require('mongoose');

const Schema = mongoose.Schema;


//create a model for the collections that's already exist
const CollectionInfo = mongoose.model("CollectionInfo", new Schema({}), "collections_info");

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









module.exports = {
    getCollectionsInfo
}