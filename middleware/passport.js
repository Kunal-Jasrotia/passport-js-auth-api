const LocalStrategy = require('passport-local').Strategy;
let userData = {};
let adminLogin = require('./userAction.js');
// expose this function to our app using module.exports
module.exports = function (passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    // used to serialize the user for the session
    passport.serializeUser(function (userData, done) {
        done(null, userData);
    });

    // used to deserialize the user
    passport.deserializeUser(function (userData, done) {
        done(null, userData);
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'emailID',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
        async function (req, emailID, password, done) {
            var result = await adminLogin.getUserLogin(emailID, password);

            // console.log(result[0].length);
            if (result[0].length != 0) {
                //let decryptObj = await commonFunc.decryptmyobject(result[0][0]);   //decrypt json from db 
                let adddecryteduser = await Promise.resolve(Object.keys(result[0]).map(v => { userData = result[0][v]; }))                 //mapping user data in passport json object
                return done(null, userData, { message: 'Welcome, You are successfully logged In' });
            } else {
                return done(null, null, { message: 'Invalid Username Or Password' });
            }
        }
    ));




};
