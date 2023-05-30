const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({

    token: {

        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    blacklisted:{
        type:Boolean,
        required:true
    }
},{
    timestamps: true,
});

/**
 * @typedef Token
 */
const Token = mongoose.model('Token', tokenSchema);

module.exports = {Token};