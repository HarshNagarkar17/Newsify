const mongoose = require('mongoose');
const {logger} = require('../libs/logger');
exports.connectDb = (url) => {
    try {
        mongoose.set('strictQuery', false);
        return mongoose.connect(url);
    } catch (error) {
        logger.error(error.message);
        return 0;
    }
}