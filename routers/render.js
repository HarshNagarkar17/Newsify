const router = require('express').Router();
const sanitize = require('sanitize-html');
const {auth, identifyUser} = require('../middlewares/auth');


router.get('/login',identifyUser, (req, res) => {
    req.user ? res.redirect('/home') : res.render('login');
})


router.get('/location',auth, (req, res) => {
    res.render('location');
})
router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/news', (req, res) => {
    res.render('news');
})
router.get('/home', auth, async(req,res) => {
    res.send('home');
})


module.exports = router;