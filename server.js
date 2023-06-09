require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const server = express();
const helmet = require('helmet');
const path = require('path');
const expressSanitizer = require('express-sanitizer');
const {connectDb} = require('./database/connect');
const {logger} = require('./libs/logger')
const cookie = require('cookie-parser');
const session = require('express-session');
const xss = require('xss-clean');
const compression = require('compression');


// EJS
server.set('view engine', 'ejs');

// json
server.use(express.json());
server.use(express.urlencoded({ extended: true}));

// cookies and sessions
server.use(cookie());
server.use(session({
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{secure:false, maxAge: 60*60*1000}
}));



//sanitize request data
server.use(xss());
server.use(expressSanitizer());

// gzip compression
server.use(compression());

// static files
server.use('/css',express.static(path.resolve(__dirname, 'assets/css')));
server.use('/js', express.static(path.resolve(__dirname, 'assets/js')));
server.use('/auth', express.static(path.resolve(__dirname, 'auth')));

server.use('/', require('./routers/render'));
server.use('/auth/', require('./routers/router'));

server.use((req, res, next) => {
    res.send('404 not found');
})


server.listen(port, () => {
    console.log(`server: ${port}`);
});

try {
    const con = connectDb(process.env.URI);
    if(!con)
        throw new Error('not able to connect to database');
    console.log('database connected');
} catch (error) {
    console.log(error);
}
