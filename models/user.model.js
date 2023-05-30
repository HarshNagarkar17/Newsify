const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    location:{
        country:{type: String},
        city:{type: String}
    },
    token:{
        type:String,
    },
    isVerified:{
        type:Boolean
    },
    news_upvoted:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'news'
    }],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'comments'
    }]
});

userSchema.statics.isEmailTaken = async function(email) {
    const user = await this.findOne({email});
    return user;
}

// bcrypt password before saving
userSchema.pre('save', async function(next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, 10);
    next();
})


userSchema.methods.comparePasswords = async function(password) {
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);
//Export the model
module.exports = {User}