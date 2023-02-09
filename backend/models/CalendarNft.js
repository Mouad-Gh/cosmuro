const mongoose = require('mongoose');

const Schema = mongoose.Schema;


//Sale schema
const CalendarSchema = new Schema({
    wallet:{
        type: Schema.Types.ObjectId,
        ref: 'Wallet'
    },
    collectionName:{
        type: String,
        required: true
    },
    collectionSize:{
        type: String,
        required: true
    },
    collectionImage:{
        type: String,
        required: true
    },
    mintPrice:{
        type: String
    },
    mintDate:{
        type: Date,
        required: true
    },
    chain:{
        type: String,
        required: true
    },
    mintToken:{
        type: String,
        required: true
    },
    discordLink: String,
    twitterLink: String,
    websiteLink: String
    

},{ timestamps: true });

//SaleSchema.statics.

module.exports = mongoose.model('Calendarnft',CalendarSchema);