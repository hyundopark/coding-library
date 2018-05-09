const mongodb = require("../mongodb");
const conn = mongodb.connection;
const ObjectId = mongodb.ObjectId;

module.exports = {
    getActiveNotificationsForChallenges: getActiveNotificationsForChallenges
  };

function getActiveNotificationsForChallenges(challengeIdsArray) {
    return conn
      .db()
      .collection("notifications")
      .find({
        challengeId: { $in: challengeIdsArray }
      })
      .toArray()
      .then(notifications => {
        return { notifications: notifications };
      });
  }