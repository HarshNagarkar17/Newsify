const http = require('http-status');
const {User} = require('../models/user.model')
const geo = require('geoip-lite');

const createUser = async(userBody, location) => {
    const {name, email, password} = userBody.data;
    const locationData = {
        city:location.city,
        country:location.country_name
    };
    if(await User.isEmailTaken(email)) {
        return false;
    }   
    
    return User.create({email, password, name, location:locationData});
};

const getUserbyEmail = async(email) => {
    return User.findOne({email});
}

const getUserLocation = (ip)=>{
    const location = geo.lookup(ip)
    if(geo){
        console.log(location);
        return {
            country: location.country,
            city: location.city,
            region: location.region
        }
    }else
        return false;
}
module.exports = {
    createUser,
    getUserbyEmail,
    getUserLocation
};













