const {getUserbyEmail} = require('./user.services');

const loginUserWithEmailAndPassword = async(email, password) => {
    const user = await getUserbyEmail(email);
    if(!user || !(await user.comparePasswords(password)))
        return false;
    return user;
}


module.exports = {
    loginUserWithEmailAndPassword
};