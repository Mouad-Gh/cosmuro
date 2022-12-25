const mongoose = require('mongoose');

//create a model for the collections that's already exist
//i added name to the schema so that i can filter with it on the find method
const collectionSchema = mongoose.Schema({ name: String, symbol: String }, { collection: 'collections_info' });

//collectionSchema.index({ name:'text' });

module.exports = mongoose.model("CollectionInfo", collectionSchema);