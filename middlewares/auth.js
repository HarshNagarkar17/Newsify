const { User } = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../services/token.services');

const auth = async (req, res, next) => {

    const token = req.cookies['dotcom-user'];
    if (token) {
        await jwt.verify(token, process.env.SECRET, (err, payload) => {
            if (err) return res.redirect('/login');

            req.user = payload.sub;
            next();
        })
    } else {
        res.redirect('/login');
    }
}
const identifyUser = async(req, res, next) => {
    const token = req.cookies['dotcom-user'];
    if(token){
        await jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
            if(err) return res.redirect('/login');

            req.user = decodedToken.sub;
        })
    }
    next();
}
module.exports = { auth, identifyUser };