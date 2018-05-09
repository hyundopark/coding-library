const mongodb = require("../mongodb");
const ObjectId = mongodb.ObjectId;
const challengeServices = require("../services/challenge.service");
const notificationServices = require("../services/notifications.service");
const userServices = require("../services/users.service");
const moment = require("moment");
const notificationsLogService = require("../services/notifications-log.service");
const sendgridServices = require("./email.service");

module.exports = {
  // ..contribution by a team member goes in this line..
  markNotificationAsNotified: markNotificationAsNotified,
  addNotificationsToLogUsingTimeRange: addNotificationsToLogUsingTimeRange,
  sendManyNotifications: sendManyNotifications,
  sendFriendRequestNotifications: sendFriendRequestNotifications
};

function addNotificationsToLogUsingTimeRange() {
  let challengeIdToBeSent = null;
  let challengeObjectIdsArray = null;
  let usersDataToSend = null;
  return new Promise((resolve, reject) => {
    let currentTime = moment().format("HHmm");
    let currentTimePlus15 = moment()
      .add(15, "minutes")
      .format("HHmm");
    return challengeServices
      .getCurrentRangeNotifications(currentTime, currentTimePlus15)
      .then(data => {
        if (data.challengeIds.length < 1) {
          return resolve(
            "There are no challenges available in the current time window."
          );
        } else {
          challengeIdToBeSent = data.challengeIds;
          challengeObjectIdsArray = data.challengeIdsAsObject;
          return userServices.generateListOfUsersAndNotificationsNeeded(
            challengeObjectIdsArray
          );
        }
      })
      .then(users => {
        if (!users) {
          return;
        }
        usersDataToSend = users;
        return notificationServices.getActiveNotificationsForChallenges(
          challengeObjectIdsArray
        );
      })
      .then(notificationsToBeSent => {
        if (notificationsToBeSent.notifications.length < 1) {
          return resolve(
            "There are no notifications associated with this challenge."
          );
        } else {
          return writeNotificationsForUsers(
            usersDataToSend,
            notificationsToBeSent
          );
        }
      })
      .then(data => {
        if (!data) {
          return;
        }
        return sendManyNotifications(data);
      })
      .then(() => {
        return resolve();
      })
      .catch(err => reject(err));
  });
}

function sendFriendRequestNotifications(notificationsForUsers) {
  notificationsLogService
    .createForFriendRequest(notificationsForUsers)
    .then(data => {
      return categorizeAndSendNotifications(data);
    })
    .then(() => resolve())
    .catch(err => reject(err));
}

function sendManyNotifications(notificationsForUsers) {
  notificationsLogService
    .create(notificationsForUsers)
    .then(data => {
      return categorizeAndSendNotifications(data);
    })
    .then(() => resolve())
    .catch(err => reject(err));
}

function sendEmailNotification(notifications) {
  for (let i = 0; i < notifications.length; i++) {
    if (notifications[i].email) {
      const emailBody = {
        to: notifications[i].email,
        from: "no-reply@poordawg.com",
        subject: "Poor Dog! " + notifications[i].message,
        text: notifications[i].message,
        html: `<p>${notifications[i].message}</p><br>
          <img src="${notifications[i].fileUrl}"/>
          <br> 
          <br> 
          <br> 
          <small>The PoorDawg Team</small>`
      };
      sendgridServices
        .sendEmail(emailBody)
        .then(res => {
          Promise.resolve(res);
        })
        .catch(err => {
          Promise.reject("error sending email");
        });
    }
  }
}