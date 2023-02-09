require("dotenv").config();
const cors=require("cors");
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions')
const userRoutes = require('./routes/users');
const walletRoutes = require('./routes/wallets');
const NftsRoutes = require('./routes/nfts');
const collectionsRoutes = require('./routes/collectionsInfo');
const salesRoutes = require('./routes/sales');
const calendarRoutes = require('./routes/calendarsNft');
const fs = require('fs');
const https = require("https");

const key = fs.readFileSync('./privkey.pem');
const cert = fs.readFileSync('./fullchain.pem');

const app = express();

//middleware

//we want logger to come before everything else
app.use(logger);

//it looks if the request has some body  and parse and attach it to the req object so we can access it
app.use(express.json());

//to enable cors
app.use(cors(corsOptions));

//telling express where to find static files like a css file or other resources like an image that we would use on the  server
app.use('/', express.static(path.join(__dirname, 'public')))

//normally we're just going to be receiving requests and sending back json data that'll be requested, and we'll be receiving json data
//however, a rest apican still have a splash page it could still also return info about req can't be fulfilled
app.use('/', require('./routes/root'));

//routes
app.use('/api/users', userRoutes);
app.use('/api/wallets', walletRoutes);
app.use('/api/nfts', NftsRoutes);
app.use('/api/collectionsInfo', collectionsRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/calendar', calendarRoutes);

//if there is a request that doesn't routed properly and didn't get stopped by any of the expected routes
//(asterisk)* means all so basically everything that reaches it to app.all, a catch all thatgoes at the end
app.all('*', (req, res) => {
    res.status(404);
    //determine what type of response to send from the headers of the requests that come in
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

//
app.use(errorHandler);

const server = https.createServer({key: key, cert: cert}, app);

//connect to db
mongoose.connect(process.env.MONG_URI)
    .then(  (Connection)=>{
        //listning for requests
        server.listen(process.env.PORT,()=>{
            console.log('connected to db & listening on port ',process.env.PORT);

            /*Tradoor = mongoose.model("Tradoor", new Schema({}), "tradooors");
            Tradoor.find({}).then(tradoor=>console.log(tradoor))*/
        });
    })
    .catch((err)=>{
        console.log(err);
    });

// Export the Express API
module.exports = app;

    
    