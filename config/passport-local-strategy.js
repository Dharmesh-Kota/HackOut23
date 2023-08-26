const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
        usernameField: 'email_username',
        passReqToCallback: true
    }, function(req, email_username, password, done){
        User.findOne({ $or: [{ email: email_username }, { username: email_username }] }, function (err, user) {
            if (err) {
                console.log('Error encountered while finding the user:', err);
                return done(err);
            }
    
            if (!user || user.password != password) {
                console.log('Invalid Email/Username or Password');
                req.flash('error', 'Invalid Email/Username or Password');
                return done(null, false);
            }
    
            return done(null, user);
          });
    }
));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err) {
            console.log('Error in finding the user through id obtained by deserializing');
            return done(err);
        }
        return done(null, user);
    });
});

// verifying if the user is authentic
passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        // if the user is authenticated then proceed him from the sign in page
        return next();
    }
    // if the user is not authenticated then send him back to the sign in page
    return res.redirect('/users/sign-in');
}

// check if the user is a builder
passport.checkBuilder = function(req, res, next){
    if(req.isAuthenticated()){
        if(req.user.role == 'builder'){
            return next();
        }
        return res.redirect('back');
    }
    return res.redirect('/users/sign-in');
}

// check if the user is a client
passport.checkClient = function(req, res, next){
    if(req.isAuthenticated()){
        if(req.user.role == 'client'){
            return next();
        }
        return res.redirect('back');
    }
    return res.redirect('/users/sign-in');
}

// check if user is a builder or a client
passport.checkBuilderClient = function(req, res, next){
    if(req.isAuthenticated()){
        if(req.user.role == 'client' || req.user.role == 'builder'){
            return next();
        }
        return res.redirect('back');
    }
    return res.redirect('/users/sign-in');
}

// using authentication as middleware 
passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // if the user is authenticated then req already contains the data of the user which we will further send to the 
        // views to make use of it
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;