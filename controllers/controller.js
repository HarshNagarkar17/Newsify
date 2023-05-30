const { User } = require('../models/user.model');
const http = require('http-status');
const {catchAync} = require('../utils/catchAync');
const _ = require('lodash');
const {generateAuthToken, saveToken} = require('../services/token.services');
const {createUser, getUserLocation} = require('../services/user.services')
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const {loginUserWithEmailAndPassword} = require('../services/auth.services');
const {trackLocation} = require('../services/location.services')

/**
 * logIn user
 * @param {Object} userBody
 * @returns {json} status and message
 */
exports.login = async (req, res) => {
    const {email, password} = req.body.data;
  const user = await loginUserWithEmailAndPassword(email, password);
  if(!user){
    return res.json({status:http.UNPROCESSABLE_ENTITY, msg: 'Incorrect credintials'});
    } 
  const token = await generateAuthToken(user);
  const maxAge = 3*24*60*60;
  await saveToken(token.token, user.id);
  const location = await trackLocation();
  console.log('location', location);
  // console.log('location: ', trackLocation());
  res.cookie('dotcom-user', token.token, {httpOnly:true, maxAge:maxAge*1000});
  return res.json({status:http.OK, msg:'LoggedIn'});
}


/**
 * Create a user
 * @param {Object} userBody
 * @returns {json} status and message
 */
exports.register = catchAync(async (req, res) => {
  const location = await trackLocation();
  const user = await createUser(req.body, location);
  if(user){
    const token = await generateAuthToken(user);  // create auth token and save into token model
    const maxAge = 3*24*60*60;
    await saveToken(token.token, user.id);
    res.cookie('dotcom-user', token.token, {httpOnly:true, maxAge:maxAge*1000});
    return res.json({status: http.OK, msg: 'user created'});
  }
  else
    return res.json({status: http.UNPROCESSABLE_ENTITY, msg: 'user already exist'});
  
})
