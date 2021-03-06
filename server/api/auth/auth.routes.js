const app = require('../../app');
const debug = require('debug')(`${app.name}:auth`);
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local');
const {env} = require('../../../index');
const {User} = require('../../index'); //
const OAuth = require('./oauth.model');
const auth = require('express').Router();


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
});

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
          return done(null, false, { message: 'Login incorrect' });
        }
        return user.authenticate(password)
          .then(ok => {
            if (!ok) {
              return done(null, false, { message: 'Login incorrect' });
            }
            done(null, user);
          });
      })
      .catch(done);
  }
));


// Our Google strategy uses API key and secret in 'secrets'
// file, also outlined in Heroku environment settings
const theGoogleStrategy = new GoogleStrategy({
    clientID: env.GOOGLE_CONSUMER_KEY,
    clientSecret: env.GOOGLE_CONSUMER_SECRET,
    callbackURL: '/api/auth/callback'
  },
  function (token, refreshToken, profile, done){
		const info = {
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

auth.get('/whoami', (req, res) => res.send(req.user));

auth.post('/login/local', passport.authenticate('local', {
    successRedirect: '/'
  }));

auth.get('/google', passport.authenticate('google', {
		scope: 'email'}
	));

auth.get('/callback', passport.authenticate('google', {
    successRedirect: '/',
		failureRedirect: '/'
  }));


auth.post('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/api/auth/whoami');
});

module.exports = auth;
