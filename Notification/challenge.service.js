const mongodb = require("../mongodb");
const conn = mongodb.connection;
const ObjectId = mongodb.ObjectId;
const moment = require("moment");

module.exports = {
  // ..contribution by a team member goes in this line..
  getCurrentRangeNotifications: getCurrentRangeNotifications
};

function getCurrentRangeNotifications(currentTime, currentTimePlus15) {
  return conn
    .db()
    .collection("challenges")
    .aggregate([
      {
        $match: {
          "notificationTimeRange.notificationStartTime": {
            $gt: currentTime,
            $lt: currentTimePlus15
          }
        }
      }
    ])
    .toArray()
    .then(challenges => {
        const challengeIds = [];
        const challengeIdsAsObject = [];
        for (let i = 0; i < challenges.length; i++) {
          challengeIds.push(challenges[i]._id.toString());
        }
        for (let i = 0; i < challenges.length; i++) {
          challengeIdsAsObject.push(challenges[i]._id);
        }
        return {
          challengeIdsAsObject: challengeIdsAsObject,
          challengeIds: challengeIds,
          challenges: challenges
        };
    });
}