const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BidSchema = new Schema({
    tx:{
        type: String,
        //required : true
    },
    blockNo:{
        type: String,
        //required: true
    },
    contract:{
        type: String,
        //required: true
    },
    token:{
        type: String,
        //required: true
    },
    bidder:{
        type: String
    },
    bidPrice:{
        type: String
    },
    bidTime:{
        type: String,
        //required: true
    }

},{ timestamps: true });


module.exports = mongoose.model('Bid',BidSchema);