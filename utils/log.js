const ensureTwoDigitFormat = num => (
  (`0${num}`).slice(-2)
);

const getTimeStamp = () => {
  const now = new Date();
  const year = ensureTwoDigitFormat(now.getFullYear());
  const month = ensureTwoDigitFormat(now.getMonth() + 1);
  const day = ensureTwoDigitFormat(now.getDate());
  const hour = ensureTwoDigitFormat(now.getHours());
  const minute = ensureTwoDigitFormat(now.getMinutes());
  const second = ensureTwoDigitFormat(now.getSeconds());
  return `${month}/${day}/${year} ${hour}:${minute}:${second}`;
};

const formatMsg = msg => (
  `${getTimeStamp()} | ${msg}`
);

/* eslint-disable no-console */
const log = {
  error: (msg) => {
    console.error(formatMsg(msg));
    console.trace();
  },
  warn: msg => console.warn(formatMsg(msg)),
  info: msg => console.log(formatMsg(msg)),
};
  /* eslint-enable no-console */

module.exports = {
  log,
};
