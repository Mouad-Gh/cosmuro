const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Username Discord | UserID Discord | UserImage Discord | Terra Wallet
// Mouad__gh | 743615326947639358 | 4a5419cd1f64cae62a811e6f770733a2 |

//wallet schema
const WalletSchema = new Schema({
    type:{
        type: String,
        required : true
    },
    adress:{
        type: String,
        required: true,
        unique: true // `wallet adress` must be unique
    },
    image: String,
    whiteListed :{
        type: Boolean,
        default: false
    }

},{ timestamps: true });

//WalletSchema.statics.

module.exports = mongoose.model('Wallet',WalletSchema);