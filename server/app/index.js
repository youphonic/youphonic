const path = require('path');
const express = require('express');
const volleyball = require('volleyball')
const passport = require('passport')
const cookies = require('cookie-session')
const bodyParser = require('body-parser')

const app = express();
module.exports = app;

const staticMiddleware = require('./static.middleware');

app.set('port', (process.env.PORT || 1337));

// dev environment logger
const logger = volleyball.custom({ debug: true })
app.use(logger)

//store entire session on a cookie
app.use(cookies({
	name: 'session',
	keys: [process.env.SESSION_SECRET || 'an insecure secret key']  //DR: where is process.env coming from? I know its a node variable but how do we set session secret on it?
}))

//body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//authentication middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(staticMiddleware);


app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', '..', 'src', 'index.html'));
});
