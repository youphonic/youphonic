require('babel-register');

const app = require('./app');

app.listen(app.get('port'), () => {
  console.log(`server listening on port ${app.get('port')}`);
});
