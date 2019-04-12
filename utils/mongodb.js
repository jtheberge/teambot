const { log } = require('./log');

/* DB names
MongoDB structure:
team-db --- database
  roster --- collection
    current-captain-index --- index of current standup captain
    list --- list of team members
*/

// temporarily disable until more developed
/* eslint-disable */
const TEAM_DB = 'team-db';
const ROSTER = 'roster';
const CUR_CAPTAIN_INDEX = 'current-captain-index';
const LIST = 'list';

const getRoster = async (mongoClient) => {
  const db = mongoClient.db(TEAM_DB);
  // convert cursor to array, then use first index as roster
  try {
    const [roster] = await db.collection(ROSTER).find().toArray();
    log.info('Fetched roster');
    return roster;
  } catch(e) {
    log.info(`Failed to fetch roster. Reason - ${e}`);
    return null;
  }
};

module.exports = {
  getRoster,
};
