const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('../Pool');
const passport = require('passport');
function handler(){
    passport.use(new GoogleStrategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:"http://localhost:3000/google/callback"
    }, async(accessToken, refreshToken, profile, done) =>{
      console.log(profile);
    }
    ))
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        done(null, user);
      });
}
