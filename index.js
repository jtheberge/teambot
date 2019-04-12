const Slackbot = require('slackbots');
const { MongoClient } = require('mongodb');
const { preventHerokuSleep } = require('./utils/heroku');
const { log } = require('./utils/log');
const { handleMessage } = require('./utils/slack');

const MONGODB_URI = process.env.mongodb;
const SLACK_BOT_TOKEN = process.env.slack;
const TEAM_BOT_NAME = process.env.botname || 'Team Bot';

preventHerokuSleep();

const mongoClient = new MongoClient(MONGODB_URI, { useNewUrlParser: true });

mongoClient.connect(async (mongoErr) => {
  if (mongoErr) {
    log.error(mongoErr);
    return;
  }

  log.info('Connected to MongoDB URI');

  const teamBot = new Slackbot({
    token: SLACK_BOT_TOKEN,
    name: TEAM_BOT_NAME,
  });

  teamBot.on('start', () => {
    log.info(`${TEAM_BOT_NAME} launched`);
  });

  teamBot.on('error', err => log.error(err));

  teamBot.on('message', async (data) => {
    if (data.type !== 'message') return;
    const { profile: { display_name: username } } = await teamBot.getUserById(data.user);
    log.info(`MESSAGE - ${username}: ${data.text}`);
    handleMessage(username, data.text);
  });
});
