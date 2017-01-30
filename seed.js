var db = require('./server/_db');
var User = require('./server/api/users/user.model');
var Play = require('./server/api/plays/play.model');

const seedUsers = () => db.Promise.map([
    {firstName: 'so many', lastName: 'yo', userName: 'IAmWhoAm', email: 'god@example.com', phoneNumber:"12345678", password: '1234'},
    {firstName: 'Barack', lastName: 'Obama', userName: 'PresIAm',email: 'bamad@example.com', phoneNumber:"1223425678", password: '123434'},
    {firstName: 'Bruce', lastName: 'Wayne', userName: 'waynecorp',email: 'waynecorp@example.com', phoneNumber:"1259376783", password: '5573563'}
  ], user => User.create(user))

	const seedPlays = () => db.Promise.map([
	    {playJson: 'whatamiwhoareyouwhatisthis'},
	    {playJson: '2whatamiwhoareyouwhatisthis'},
			{playJson: '3whatamiwhoareyouwhatisthis'},
			{playJson: '4whatamiwhoareyouwhatisthis'}
	  ], play => Play.create(play))

db.didSync
	.then( () => db.sync({force: true}))
	.then(seedUsers)
	.then(users => console.log(`Seeded ${users.length} users OK`))
	.then(seedPlays)
	.then(plays => console.log(`Seeded ${plays.length} plays OK`))
