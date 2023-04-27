const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const passport = require('passport')
const session = require('express-session');
const bodyParser = require('body-parser');

require('./middleware/passport')(passport);
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());

app.use(session({
    secret: 'dftgyhujikooijhgfhjk',
    resave: true,
    saveUninitialized: true,
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', function (req, res) {
    console.log("here in login")
    console.log(req.body)
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/register',
        failureFlash: true,
        successFlash: true
    })(req, res);
});

app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) console.log(err)
    })
})


const dbcon = require('./middleware/DBconnection')
global.dbconnection = dbcon

const home = require('./routes/user')
app.use('/', home)


app.listen(5000, () => {
    console.log('listening')
})