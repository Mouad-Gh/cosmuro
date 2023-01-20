const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Username Discord | UserID Discord | UserImage Discord | Terra Wallet
// Mouad__gh | 743615326947639358 | 4a5419cd1f64cae62a811e6f770733a2 |

//wallet schema
const WalletSchema = new Schema({
    type:{
        type: String
    },
    adress:{
        type: String,
        required: true,
        unique : true
    }
})
//enforce the unique index for the list
//WalletSchema.index( {type: 1, adress: 1} , {unique: true} );
const UserSchema = new Schema({
    name : {
        type : String,
        required: true
    },
    discordId : {
        type : String,
        required: true,
        unique : true
    },
    discordImage : {
        type : String
    },
    wallets: [
        WalletSchema
    ]

},{ timestamps: true });

//UserSchema.index({wallets.wallet})

module.exports = mongoose.model('User', UserSchema);


