const path = require('path');
const express = require('express');
const volleyball = require('volleyball')
const passport = require('passport')
const cookies = require('cookie-session')
const bodyParser = require('body-parser')
const {User} = require('../index')


const app = express();
module.exports = app;

app.set('port', (process.env.PORT || 1337));

//store entire session on a cookie
//must come before any routing or middleware
app.use(cookies({
	name: 'session',
	keys: [process.env.SESSION_SECRET || 'an insecure secret key']
}));

// dev environment logger
const logger = volleyball.custom({ debug: true });
app.use(volleyball);

//body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//authentication middleware
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done){
	done(null, user.id);
});
passport.deserializeUser(function (id, done){
	User.findById(id)
	.then(function (user) {
		done(null, user);
	})
	.catch(done);
});

const staticMiddleware = require('./static.middleware');
app.use(staticMiddleware);

//mount api and api routes
app.use('/api', require('../api/api'));

//TODO: This needs to be adjusted to serve api routes
// currently serving index.html to all routes with wildcard
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', '..', 'src', 'index.html'));
});

// error handling middleware
app.use((error, req, res, next) => {
	//if there is no error.status already set, we are defaulting to 500
    error.status = error.status || 500;
    error.message = error.message || 'Internal Error';
    res.status(error.status).send(error.message);
});
