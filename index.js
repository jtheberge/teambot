var mongoose = require('mongoose');
const { preventHerokuSleep } = require('./utils/heroku');
const { log } = require('./utils/log');
const { handleMessage } = require('./utils/slack');
var slackbot = require('./utils/slack');

const MONGODB_URI = process.env.mongodb || 'mongodb://localhost/SLACKBOT';

preventHerokuSleep();

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB connected!');
});

slackbot.run();
