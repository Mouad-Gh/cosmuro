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
    nftID:{
        type: String,
        required: true
    },
    nftImage: String,
    amount:{
        type: String,
        required: true
    },
    seller:{
        type: String,
        required: true
    },
    buyer:{
        type: String,
        required: true
    }

},{ timestamps: true });

//SaleSchema.statics.

module.exports = mongoose.model('Sale',SaleSchema);