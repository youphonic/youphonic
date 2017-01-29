const path = require('path');
const express = require('express');
const volleyball = require('volleyball')
const passport = require('passport')
const cookies = require('cookie-session')
const bodyParser = require('body-parser')

const app = express();
module.exports = app;

app.set('port', (process.env.PORT || 1337));

//store entire session on a cookie
//must come before any routing or middleware
app.use(cookies({
	name: 'session',
	keys: [process.env.SESSION_SECRET || 'an insecure secret key']  //DR: where is process.env coming from? I know its a node variable but how do we set session secret on it?
}))

// dev environment logger
const logger = volleyball.custom({ debug: true })
app.use(logger)


//body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//authentication middleware
app.use(passport.initialize())
app.use(passport.session())

const staticMiddleware = require('./static.middleware');
app.use(staticMiddleware);

//mount api and api routes
app.use('/api', require('../api/api'));


app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', '..', 'src', 'index.html'));
});

// error handling middleware
app.use((error, req, res, next) => {
	//if there is no error.status already set, we are defaulting to 500
    error.status = error.status || 500;
    error.message = error.message || 'Internal Error';
    res.send('error', {error})
});
