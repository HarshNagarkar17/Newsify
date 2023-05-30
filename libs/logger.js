const {createLogger, transports, format} = require('winston');
const {printf, timestamp, combine} = format


const logformat = printf(({level, timestamp, message}) => {
    return `${timestamp} .. ${level} : ${message}`
});

//creating logger
exports.logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        logformat
    ),
    transports:[
        new transports.Console(),
        new transports.File({ filename: 'logs/app.log'})
    ],
    exceptionHandlers:[
        new transports.Console(),
        new transports.File({ filename: 'logs/errors.log'})
    ]
}) ;


