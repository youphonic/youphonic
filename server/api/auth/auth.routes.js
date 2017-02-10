const app = require('../../app')//, {env} = app
const debug = require('debug')(`${app.name}:auth`)
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local');
const {env} = require('../../../index');
const {User} = require('../../index'); //
const OAuth = require('./oauth.model');
const auth = require('express').Router();


/*************************
 * Auth strategies
 *
 * The OAuth model knows how to configure Passport middleware.
 * To enable an auth strategy, ensure that the appropriate
 * environment variables are set.
 *
 * You can do it on the command line:
 *
 *   FACEBOOK_CLIENT_ID=abcd FACEBOOK_CLIENT_SECRET=1234 npm start
 *
 * Or, better, you can create a ~/.$your_app_name.env.json file in
 * your home directory, and set them in there:
 *
 * {
 *   FACEBOOK_CLIENT_ID: 'abcd',
 *   FACEBOOK_CLIENT_SECRET: '1234',
 * }
 *
 * Concentrating your secrets this way will make it less likely that you
 * accidentally push them to Github, for example.
 *
 * When you deploy to production, you'll need to set up these environment
 * variables with your hosting provider.
 **/

// Facebook needs the FACEBOOK_CLIENT_ID and FACEBOOK_CLIENT_SECRET
// environment variables.
OAuth.setupStrategy({
  provider: 'facebook',
  strategy: require('passport-facebook').Strategy,
  config: {
    clientID: env.FACEBOOK_CLIENT_ID,
    clientSecret: env.FACEBOOK_CLIENT_SECRET,
    callbackURL: `${app.baseUrl}/api/auth/login/facebook`,
  },
  passport
})

// Github needs the GITHUB_CLIENT_ID AND GITHUB_CLIENT_SECRET
// environment variables.
OAuth.setupStrategy({
  provider: 'github',
  strategy: require('passport-github2').Strategy,
  config: {
    clientID: env.GITHUB_CLIENT_ID,
    clientSecrets: env.GITHUB_CLIENT_SECRET,
    callbackURL: `${app.baseUrl}/api/auth/login/github`,
  },
  passport
});

passport.use(new (require('passport-local').Strategy) (
  (email, password, done) => {
    User.findOne({where: {email}})
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Login incorrect' })
        }
        return user.authenticate(password)
          .then(ok => {
            if (!ok) {
              return done(null, false, { message: 'Login incorrect' })
            }
            done(null, user)
          })
      })
      .catch(done)
  }
))


// Our Google strategy
// Google needs the GOOGLE_CONSUMER_SECRET AND GOOGLE_CONSUMER_KEY
// environment variables.
var theGoogleStrategy = new GoogleStrategy({
    clientID: env.GOOGLE_CONSUMER_KEY,
    clientSecret: env.GOOGLE_CONSUMER_SECRET,
    callbackURL: '/api/auth/callback'
  },
  function (token, refreshToken, profile, done){
		const info={
      userName: profile.emails[0].value,
      firstName: profile.displayName.split(' ')[0],
			lastName: profile.displayName.split(' ')[1],
			email: profile.emails[0].value
	};
	User.findOrCreate({
		where: {googleId: profile.id},
		defaults: info
	})
	.spread(function (user) {
		done(null, user);
	});
});

passport.use(theGoogleStrategy);

auth.get('/whoami', (req, res) => res.send(req.user))

auth.post('/login/local', passport.authenticate('local', {
    successRedirect: '/',
		failureRedirect: '/'
  }));

auth.get('/google', passport.authenticate('google', {
		scope: 'email'}
	));

auth.get('/callback', passport.authenticate('google', {
    successRedirect: '/',
		failureRedirect: '/'
  }));


auth.post('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/api/auth/whoami')
})

module.exports = auth
