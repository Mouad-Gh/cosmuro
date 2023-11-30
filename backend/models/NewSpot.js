const mongoose = require('mongoose');

const Schema = mongoose.Schema;


//newSpot schema
const NewSpotSchema = new Schema({
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
    creator:{
        type: String
    },
    startPrice:{
        type: Number
    },
    duration:{
        type: Number,
        //required: true
    },
    prize:{
        type: String,
        //required: true
    }

},{ timestamps: true });

//NewSpotSchema.statics.

module.exports = mongoose.model('NewSpot',NewSpotSchema);