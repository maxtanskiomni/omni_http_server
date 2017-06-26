// server.js
const express         = require('express');
const bodyParser      = require('body-parser');
const firebase        = require('./config/fb').firebase;

const app             = express();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

require('./routes')(app, firebase);

app.listen(port, () => {
  console.log('We are live on ' + port);
  jobs.subscription(firebase);
});
