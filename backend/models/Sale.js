const mongoose = require('mongoose');

const Schema = mongoose.Schema;


//Sale schema
const SaleSchema = new Schema({
    contract:{
        type: String,
        required : true
    },
    chain:{
        type: String,
        required: true
    },
    transactionID:{
        type: String,
        required: true
    },
    nftID:{
        type: String,
        required: true
    },
    nftImage: String,
    CollectionName:{
        type: String
    },
    collectionImage: String,
    amount:{
        type: Number,
        required: true
    },
    buyer:{
        type: String,
        required: true
    }

},{ timestamps: true });

//SaleSchema.statics.

module.exports = mongoose.model('Sale',SaleSchema);