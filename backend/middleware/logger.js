const { format } =require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

//add a logger
const logEvents = async (message, logFileName)=>{

    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
    //uuid() to create a specific id for each logitem
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        //looks for the logs folder, if it doesn't exist then we'll create it 
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        //appending to our log file or creating that log file if it doesn't exist
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch (err) {
        console.log(err)
    }
}

const logger = (req, res, next) => {
    //write the log to reqLog.log which is like a text file but that's the convention for writing logs
    // this log every request that comes in so maybe we'll want to put some conditionals in there 
    //that would say only log it if it's not coming from our own url or only specific requests methods cuz this'll get full very fast
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    //console.log(`${req.method} ${req.path}`)
    next()
}

module.exports = { logEvents, logger }