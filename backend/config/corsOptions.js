//https://github.com/gitdagray/mern_stack_course/blob/main/lesson_13-backend/config/corsOptions.js

const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin: (origin, callback) => {

        //!origin means anything that doesn't provide an origin like postman or desktop applications  || !origin
        if (allowedOrigins.indexOf(origin) !== -1   ) {
            //callback(an error object, the allowed boolean)
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    //set the access control allow credentials header
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions 