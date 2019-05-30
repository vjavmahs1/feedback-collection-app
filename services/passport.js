const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/key');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
});

// Register new strategy to the passport
// Create new instance of the Google passport strategy
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({googleId: profile.id})
            .then((existingUser)=> {
                if (existingUser) {
                    // we already have a recoord with the given ID
                    done(null, existingUser);
                } else {
                    // we don't have a user record with this ID, make new one
                    new User ({googleId: profile.id})
                    .save()
                    .then(user => done(null, user));
                }
            });
    })
);


