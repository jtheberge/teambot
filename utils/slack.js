var SlackBot = require('slackbots'); // import slackbot library
var mongoose = require('mongoose');  // import mongoose library for accessing MongoDB
var Message = require('../models/message.js'); // import slackbot data model
const {
  HELP,
  ROSTER,
  ADD,
  REMOVE,
  DELETE,
  SHOW,
  LIST,
  DISPLAY
} = require('../constants/keywords');

const SLACK_BOT_TOKEN = process.env.slackToken || '';
const TEAM_BOT_NAME = process.env.botname || 'Team Bot';

/* Create Bot using My Slack Team API KEY */
var bot = new SlackBot({
    token: SLACK_BOT_TOKEN,
    name: TEAM_BOT_NAME
});

exports.run = () => {
  bot.on('start', onStart);
  bot.on('message', onMessage);
}

var onStart = () => {
  console.log('Bot started');
}

var onMessage = (message) => {
  if(message.type === 'message' && Boolean(message.text)) {

      if (hasAllWords(HELP, message.text)) {
        // todo
        console.log('help in message');
        console.log(bot.channels[0].id);

      } else if (hasAllWords([ROSTER], message.text)) {
        if (hasAllWords(ADD, message.text)) {
          // todo
        } else if (hasSomeWords([REMOVE, DELETE], message.text)) {
          // todo
        } else if (hasSomeWords([SHOW, LIST, DISPLAY], message.text)) {
          // todo
        }
      }

  }
}

var saveWord = (channel,user, word) => {

  Message.create({user_id:user.id,keyword:word}, (err, post) => {
    if (err) {
      console.log(err);
      return;
    } else {
      countWord(channel,user);
    }
  });
}

var countWord = (channel,user) => {
  Message.find({user_id:user.id}).exec((err, result) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log(result);
    }
  });
}

const hasAllWords = (words, msg) => {
  const wordsArr = Array.isArray(words) ? words : [words];
  return wordsArr.every(word => new RegExp(`\\b${word}\\b`, 'i').test(msg));
};

const hasSomeWords = (words, msg) => {
  const wordsArr = Array.isArray(words) ? words : [words];
  return wordsArr.some(word => new RegExp(`\\b${word}\\b`, 'i').test(msg));
};
