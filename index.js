// Hackout'23
// importing express library
const express = require('express');
const app = express();

// decalring the local server port or the Render port
const port = process.env.PORT || 8000;

// providing https server for Render
const httpsRedirect = require('express-https-redirect');

// importing the path module for easiness in file paths
const path = require('path');

// importing the express-ejs layouts library
const expressLayouts = require('express-ejs-layouts');

// importing sass-middleware library which helps in quick conversion of sass files into the css ones
const sassMiddleware = require('node-sass-middleware');

// importing express-sessions used in creating sessions for storing user's data
const session = require('express-session');

// providing access to the database
const db = require('./config/mongoose');

// importing express-session library to create session cookies
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

// importing the passport js libraries
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');

// giving access to the mongo-connect
const MongoStore = require('connect-mongo');

// importing the connect-flash library to set up flash notifications and setting up its middleware
const flash = require('connect-flash');
const customMware = require('./config/flash_middleware');

// using the httpsRedirect middleware
app.use('/', httpsRedirect());

// giving access to static files and converting sass files to css using the sass-middleware library
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'compressed',
    prefix: '/css'
}));

// using middleware to parse form data into req.body
app.use(express.urlencoded());

// cookie parser
app.use(cookieParser());

// providing access to static files
app.use(express.static('./assets'));

// making the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(expressLayouts);

// express-ejs-layout middleware to extract styles and scripts from sub pages into the layouts.
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setting up ejs and giving access to the views folder
app.set('view engine', 'ejs');
app.set('views', './views');

// establishing cookie
const secret = crypto.randomBytes(32).toString('hex');
app.use(session({
    name: 'Ds-Blog',
    secret: secret,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000*60*100)
    },
    // storing the cookie-data in mongo db
    store: MongoStore.create({
        mongoUrl: process.env.MONGOURL || 'mongodb://127.0.0.1:27017/hackout-rodic',
        autoRemove: 'disabled'
    }, function(err){
        console.log(err || 'connect-mongo setup ok!!');
    })
}));

// handling passport middlewares
app.use(passport.initialize());
app.use(passport.session());

// handling the checkAuthenticated function for evry request as a middleware
app.use(passport.setAuthenticatedUser);

// using the flash middleware
app.use(flash());
app.use(customMware.set_flash);

// using remote routes folder 
app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log(err);
        return;
    }

    console.log('Server is up and running on port: ', port);
});