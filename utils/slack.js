// keywords to parse
const HELP = 'help';
const ROSTER = 'roster';
const ADD = 'add';
const REMOVE = 'remove';
const DELETE = 'delete';
const SHOW = 'show';
const LIST = 'list';
const DISPLAY = 'display';


const hasAllWords = (words, msg) => {
  const wordsArr = Array.isArray(words) ? words : [words];
  return wordsArr.every(word => new RegExp(`\\b${word}\\b`, 'i').test(msg));
};

const hasSomeWords = (words, msg) => {
  const wordsArr = Array.isArray(words) ? words : [words];
  return wordsArr.some(word => new RegExp(`\\b${word}\\b`, 'i').test(msg));
};

const handleMessage = (msg) => {
  if (hasAllWords(HELP, msg)) {
    // todo
  } else if (hasAllWords([ROSTER])) {
    if (hasAllWords(ADD)) {
      // todo
    } else if (hasSomeWords([REMOVE, DELETE])) {
      // todo
    } else if (hasSomeWords([SHOW, LIST, DISPLAY])) {
      // todo
    }
  }
};

module.exports = {
  handleMessage,
};
