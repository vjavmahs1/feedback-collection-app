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
    }, async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({googleId: profile.id})
        if (existingUser) {
            // we already have a record with the given ID
             done(null, existingUser);
        } else {
            // we don't have a user record with this ID, make new one
            const user = await new User ({googleId: profile.id}).save()
            done(null, user);
        }
    })
);


