const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const duplicateUserEmail = await User.findOne({ email: profile.emails[0].value });
      if (duplicateUserEmail) {
        return done(null, duplicateUserEmail);
      }

      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({
        googleId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        avatar: profile._json.image.url,
        gender: profile.gender,
        placesLived: profile._json.placesLived
      }).save();
      done(null, user);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: '/auth/facebook/callback',
      profileFields: [
        'id',
        'displayName',
        'last_name',
        'first_name',
        'address',
        'gender',
        'about',
        'picture',
        'email'
      ],
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const duplicateUserEmail = await User.findOne({ email: profile.emails[0].value });
      if (duplicateUserEmail) {
        return done(null, duplicateUserEmail);
      }

      const existingUser = await User.findOne({ facebookId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }

      const {
        id,
        name: { familyName, givenName },
        gender,
        emails,
        photos
      } = profile;

      try {
        const user = await new User({
          facebookId: id,
          firstName: givenName,
          lastName: familyName,
          email: emails[0].value,
          avatar: photos[0].value,
          gender
        }).save();
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
