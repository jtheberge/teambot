const https = require('https');
const { log } = require('./log');

const HEROKU_ENDPOINT = process.env.heroku;

const twentyNineMinInMs = 1740000;

const logHerokuPing = (res) => {
  const { statusCode, statusMessage } = res;
  if (statusCode > 199 && statusCode < 300) log.info(`STATUS: ${statusCode} - Heroku ping succeeded`);
  else log.error(`Heroku ping failed. Reason - ${statusCode}: ${statusMessage}`);
};

const pingHeroku = () => {
  https.get(HEROKU_ENDPOINT, logHerokuPing);
};

// heroku falls asleep after 30 min of non-use, so re-ping self every 29 min
const preventHerokuSleep = () => {
  setInterval(pingHeroku, twentyNineMinInMs);
};

module.exports = {
  preventHerokuSleep,
};
