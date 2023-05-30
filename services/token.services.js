const {Token} = require('../models/token.model');
const jwt = require('jsonwebtoken');
const http = require('http-status');
const moment = require('moment');
const {User} = require('../models/user.model');


const generateToken = async(user, secret = process.env.SECRET) => {
    const payload = {
        sub: user,
        iat: moment().unix(),
    };
    return jwt.sign(payload, secret);
}


const saveToken = async(token, _id) => {
    const user = await User.findOneAndUpdate({_id}, {$set: {token:token}}, {new:true}); 
    return user;
}


const verifyToken = async(token) => {

    const verify = await jwt.verify(token, process.env.SECRET);
    return User.findOne({_id:verify.sub});
}
/**
 * generate auth tokens
 * @param {Object} user
 * @returns {Promise<Object>}
 */

const generateAuthToken = async(user)=>{
    const accessToken = await generateToken(user.id);
    //save the token in model
    const token = await saveToken(accessToken, user.id);
    return token;
}

module.exports = {generateAuthToken, saveToken, verifyToken};


