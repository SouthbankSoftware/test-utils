/**
 * Created by joey on 15/6/17.
 */

const {launchMongoInstance, launchSingleInstance, killMongoInstance, launchReplicaSet, launchMongos, getRandomPort, generateMongoData} = require('src/mlaunch_utils');

module.exports = {
  launchSingleInstance,
  killMongoInstance,
  launchMongoInstance,
  launchReplicaSet,
  launchMongos,
  getRandomPort,
  generateMongoData,
};