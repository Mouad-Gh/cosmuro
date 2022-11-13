require("dotenv").config();
const cors=require("cors");
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const walletRoutes = require('./routes/wallets');
const NftsRoutes = require('./routes/nfts');
const collectionsRoutes = require('./routes/collectionsInfo');

const app = express();

//middleware
//it looks if the request has some body  and parse and attach it to the req object so we can access it
app.use(express.json());
//to enable cors
app.use(cors());

//routes
app.use('/api/users', userRoutes);
app.use('/api/wallets', walletRoutes);
app.use('/api/nfts', NftsRoutes);
app.use('/api/collectionsInfo', collectionsRoutes);

//connect to db
mongoose.connect(process.env.MONG_URI)
    .then(  (Connection)=>{
        //listning for requests
        app.listen(process.env.PORT,()=>{
            console.log('connected to db & listening on port ',process.env.PORT);

            /*Tradoor = mongoose.model("Tradoor", new Schema({}), "tradooors");
            Tradoor.find({}).then(tradoor=>console.log(tradoor))*/
        });
    })
    .catch((err)=>{
        console.log(err);
    });

    
    